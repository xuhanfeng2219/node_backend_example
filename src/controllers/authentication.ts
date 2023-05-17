/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:16:05
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 20:26:18
 */
import express from 'express';

import { getUserByUsername, createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';
import { logger } from '../common/log';
import { Result } from '../common/common';

export const register = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { password, username, email, role } = req.body;

        if (!password || !username || !email) {
            result.code = 400;
            result.msg = "缺少必填项！"
            return res.sendStatus(400).json(result);
        }

        const existingUser = await getUserByUsername(username) || await getUserByEmail(email);

        if (existingUser) {
            result.code = 400;
            result.msg = "该用户已存在！";
            return res.sendStatus(400).json(result);
        }

        const salt = random;

        await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
            role,
        });
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

export const login = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            result.code = 400;
            result.msg = "缺少必填项！"
            return res.sendStatus(400).json(result);
        }

        const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');

        if (!user) {
            result.code = 400;
            result.msg = "该用户不存在！"
            return res.sendStatus(400).json(result);
        }

        const exceptHash = await authentication(user.authentication.salt, password);

        if (user.authentication.password !== exceptHash) {
            result.code = 403;
            result.msg = "密码不对！"
            return res.sendStatus(403).json(result);
        }

        const salt = random;
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        
        await user.save();
        //  this domain need to changed when we push to the aws
        res.cookie('XUHANFENG-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

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