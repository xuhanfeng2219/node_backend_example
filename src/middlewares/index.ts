/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:49:28
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 14:14:15
 */
import express from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

import { logger } from '../common/log';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['XUHANFENG-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403).json({msg: 'Token can\'t set '});
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        logger.error(error);
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
        logger.error(error);
        return res.sendStatus(400);
    }
};

