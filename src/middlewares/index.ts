/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:49:28
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 08:28:34
 */
import express from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

import { logger } from '../common/log';
import { Result } from '../common/common';

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const result = new Result();
    try {
        const sessionToken = req.cookies['XUHANFENG-AUTH'];

        if (!sessionToken) {
            result.result = sessionToken;
            result.code = 403;
            result.msg="Token not found";
            return res.status(403).json(result);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            result.result = sessionToken;
            result.code = 403;
            result.msg="Invalid token";
            return res.status(403).json(result);
        }

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        logger.error(error);
        result.result = {};
            result.code = 403;
            result.msg="fail";
        return res.status(400);
    }
};

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        logger.info(`current user ${currentUserId}`);
        if (!currentUserId) {
            return res.status(400);
        }

        if (currentUserId.toString() !== id) {
            return res.status(403);
        }

        next();
    } catch (error) {
        logger.error(error);
        return res.status(400);
    }
};

