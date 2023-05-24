/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:28:02
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 13:24:24
 */
import express from 'express';

import authentication from './authentication';
import users from './users';
import staffs from './staffs';
import customers from './customers';
import services from './services';
import matchings from './matchings';
import bookings from './bookings';
import prime_match from './prime_match';

export const router = express.Router();

export default(): express.Router => {
    authentication(router);
    users(router);
    staffs(router);
    customers(router);
    services(router);
    matchings(router);
    bookings(router);
    prime_match(router);
    return router;
};