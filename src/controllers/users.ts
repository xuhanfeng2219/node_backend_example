/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 20:41:39
 */
import express from 'express';

import { getUsers, deleteUserById, getUserById, getUserByUsername, getUsersCount } from '../db/users';
import { Page , Result} from '../common/common';
import { logger } from '../common/log';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);
    } catch (error) {
        logger.error(error);
        return res.sendStatus(400);
    }
};

export const getUsersByPage = async (req: express.Request, res: express.Response) => {
    try {
        const query: Page = req.body;
        const page = query.page === 0 ? 1 : query.page;
        const limit = query.limit === 0 ? 10 : query.limit;
        const total = await getUsersCount();
        const users = await getUsers().skip((page - 1)*limit).limit(limit);
        const result = new Result();
        result.results = users;
        result.total = total;
        result.page = page;
        result.limit = limit;
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        return res.sendStatus(400);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleteUser = await deleteUserById(id);

        return res.status(200).json(deleteUser); 
    } catch (error) {
        logger.error(error);
        return res.sendStatus(400);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        const isexistUsername = await getUserByUsername(username);

        if (isexistUsername) {
            return res.status(400).json({msg : '该用户名已存在！'});
        }
        user.username = username;
        await user.save();

        return res.status(200).json(user).end();

    } catch (error) {
        logger.error(error);
        return res.sendStatus(400);
    }
};