/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 10:59:02
 */
import express from 'express';

import { getAllStaffs, deleteStaff, updateStaff, getStaffsByPage, createdStaff } from '../controllers/staffs';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/staffs';

export default(router: express.Router) => {
    router.get('/staffs',isAuthenticated, getAllStaffs);
    router.post('/staffs',upload.single('image'), createdStaff);
    router.post('/staffs',isAuthenticated, getStaffsByPage);
    router.delete('/staffs/:id',isAuthenticated, isOwner ,deleteStaff);
    router.patch("/staffs/:id",isAuthenticated, isOwner ,updateStaff);
};
