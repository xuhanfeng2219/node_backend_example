/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:28:02
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-18 10:12:56
 */
import express from 'express';

import authentication from './authentication';
import users from './users';
import staffs from './staffs';
import customers from './customers';

export const router = express.Router();

export default(): express.Router => {
    authentication(router);
    users(router);
    staffs(router);
    customers(router);
    return router;
};