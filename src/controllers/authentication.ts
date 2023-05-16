/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:16:05
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 17:40:27
 */
import express from 'express';

import { getUserByUsername, createUser, getUserByEmail } from '../db/users';
import { random, authentication } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { password, username, email } = req.body;

        if (!password || !username || !email) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByUsername(username) || await getUserByEmail(email);

        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random;

        const user = await createUser({
            username,
            email,
            authentication: {
                salt,
                password: authentication(salt, password),
            },
        });

        return res.status(200).json(user).end();
        
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {username, password} = req.body;

        if (!username || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByUsername(username).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const exceptHash = await authentication(user.authentication.salt, password);

        if (user.authentication.password !== exceptHash) {
            return res.sendStatus(403);
        }

        const salt = random;
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        
        await user.save();
        //  this domain need to changed when we push to the aws
        res.cookie('XUHANFENG-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
         
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};