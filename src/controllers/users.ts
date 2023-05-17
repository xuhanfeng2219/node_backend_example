/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 20:43:49
 */
import express from 'express';

import { getUsers, deleteUserById, getUserById, getUserByUsername, getUsersCount } from '../db/users';
import { Page , PageResult, Result} from '../common/common';
import { logger } from '../common/log';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        result.result = await getUsers();
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const getUsersByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        const page = query.page === 0 ? 1 : query.page;
        const limit = query.limit === 0 ? 10 : query.limit;
        const total = await getUsersCount();
        const users = await getUsers().skip((page - 1)*limit).limit(limit);
        result.result = users;
        result.total = total;
        result.page = page;
        result.limit = limit;
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;

        result.result = await deleteUserById(id);
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result); 
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const updateUser = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const { username } = req.body;
        if (!username) {
            result.code = 400;
            result.msg = "用户名不能为空！";
            return res.status(400).json(result);
        }

        const user = await getUserById(id);

        const isexistUsername = await getUserByUsername(username);

        if (isexistUsername) {
            result.code = 400;
            result.msg = "该用户名已存在！";
            return res.status(400).json(result);
        }
        user.username = username;
        await user.save();
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();

    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};