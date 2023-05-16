/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 19:14:01
 */
import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUsersByPage } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default(router: express.Router) => {
    router.get('/users',isAuthenticated, getAllUsers);
    router.post('/users',isAuthenticated, getUsersByPage);
    router.delete('/users/:id',isAuthenticated, isOwner ,deleteUser);
    router.patch("/users/:id",isAuthenticated, isOwner ,updateUser);
};
