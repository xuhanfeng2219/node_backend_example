/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 21:54:58
 */
import express from 'express';

import { getAllUsers, deleteUser, updateUser, getUsersByPage } from '../controllers/users';
import { isAuthenticated, isOwner } from '../middlewares';

export default(router: express.Router) => {
    // isAuthenticated,
    router.get('/api/users', getAllUsers);
    // isAuthenticated,
    router.post('/api/users', getUsersByPage);
    // ,isAuthenticated, isOwner 
    router.delete('/api/users/:id', deleteUser);
    // isAuthenticated, isOwner ,
    router.patch("/api/users/:id", updateUser);
};
