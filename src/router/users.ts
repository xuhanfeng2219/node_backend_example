/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 20:09:26
 */
import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUsersByPage } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default(router: express.Router) => {
    // isAuthenticated,
    router.get('/users', getAllUsers);
    // isAuthenticated,
    router.post('/users', getUsersByPage);
    // ,isAuthenticated, isOwner 
    router.delete('/users/:id', deleteUser);
    // isAuthenticated, isOwner ,
    router.patch("/users/:id", updateUser);
};
