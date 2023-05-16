/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:49:28
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 18:58:45
 */
import express from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['XUHANFENG-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        if (!currentUserId) {
            return res.sendStatus(400);
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        }

        next();
    } catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};

