/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 17:41:05
 */
import express from 'express';

import { getAllStaffs, deleteStaff, updateStaff, getStaffsByPage, createdStaff, sortStaff, deleteStaffs } from '../controllers/staffs';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/staffs';

export default(router: express.Router) => {
    router.get('/staffs', getAllStaffs);
    router.post('/staffs',upload.single('file'), createdStaff);
    router.post('/staffs/page', getStaffsByPage);
    router.delete('/staffs/:id',deleteStaff);
    router.post('/staffs/batchdelete',deleteStaffs);
    router.patch("/staffs/:id",upload.single('file'), updateStaff);
    router.post('/staffs/sort', sortStaff);
};
