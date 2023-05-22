/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 09:13:05
 */
import express from 'express';

import { getAllBookings, deleteBooking, updateBooking, getBookingsByPage, createdBooking, deleteBookings, getBookingsByCondition, getBookingsByUpDate } from '../controllers/bookings';
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
    router.get('/bookings/query_date/:date', getBookingsByUpDate);
};
