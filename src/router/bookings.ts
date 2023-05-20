/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-20 10:39:17
 */
import express from 'express';

import { getAllBookings, deleteBooking, updateBooking, getBookingsByPage, createdBooking, deleteBookings, getBookingsByCondition } from '../controllers/bookings';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/bookings';

export default (router: express.Router) => {
    router.get('/bookings', getAllBookings);
    router.post('/bookings', createdBooking);
    router.post('/bookings/page', getBookingsByPage);
    router.delete('/bookings/:id', deleteBooking);
    router.post('/bookings/batchdelete', deleteBookings);
    router.patch("/bookings/:id", updateBooking);
    router.patch('/bookings/query/:condition', getBookingsByCondition);
};
