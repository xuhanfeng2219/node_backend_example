/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:28:02
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-19 14:51:59
 */
import express from 'express';

import authentication from './authentication';
import users from './users';
import staffs from './staffs';
import customers from './customers';
import services from './services';

export const router = express.Router();

export default(): express.Router => {
    authentication(router);
    users(router);
    staffs(router);
    customers(router);
    services(router);
    return router;
};