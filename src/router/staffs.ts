/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-19 10:30:30
 */
import express from 'express';

import { getAllStaffs, deleteStaff, updateStaff, getStaffsByPage, createdStaff, sortStaff, deleteStaffs, displayStaff, getStaffsByCondition } from '../controllers/staffs';
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
    router.post('/staffs/display', displayStaff);
    router.patch('/staffs/query/:condition', getStaffsByCondition);
};
