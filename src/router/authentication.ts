/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:29:32
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-14 20:48:33
 */
import express from 'express';

import { login, register } from 'controllers/authentication';

export default(router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
};