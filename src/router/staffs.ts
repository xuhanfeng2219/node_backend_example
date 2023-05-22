/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 21:54:45
 */
import express from 'express';

import { getAllStaffs, deleteStaff, updateStaff, getStaffsByPage, createdStaff, sortStaff, deleteStaffs, displayStaff, getStaffsByCondition } from '../controllers/staffs';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/staffs';

export default(router: express.Router) => {
    router.get('/api/staffs', getAllStaffs);
    router.post('/api/staffs',upload.single('file'), createdStaff);
    router.post('/api/staffs/page', getStaffsByPage);
    router.delete('/api/staffs/:id',deleteStaff);
    router.post('/api/staffs/batchdelete',deleteStaffs);
    router.patch("/api/staffs/:id",upload.single('file'), updateStaff);
    router.post('/api/staffs/sort', sortStaff);
    router.post('/api/staffs/display', displayStaff);
    router.patch('/api/staffs/query/:condition', getStaffsByCondition);
};
