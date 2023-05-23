/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 08:25:08
 */
import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUsersByPage } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default (router: express.Router) => {
    // isAuthenticated,
    router.get('/api/users', isAuthenticated, getAllUsers);
    // isAuthenticated,
    router.post('/api/users', isAuthenticated, getUsersByPage);
    // ,isAuthenticated, isOwner 
    router.delete('/api/users/:id', isAuthenticated, isOwner, deleteUser);
    // isAuthenticated, isOwner ,
    router.patch("/api/users/:id", isOwner, updateUser);
};
