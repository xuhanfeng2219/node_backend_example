/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:28:02
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 18:42:45
 */
import express from 'express';

import authentication from './authentication';
import users from './users';

export const router = express.Router();

export default(): express.Router => {
    authentication(router);
    users(router);
    return router;
};