/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 18:21:02
 */
import express from 'express';

import { getAllBookings, deleteBooking, updateBooking, getBookingsByPage, createdBooking, deleteBookings, getBookingsByCondition, getBookingsByUpDate, cancelBooking } from '../controllers/bookings';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/bookings';

export default (router: express.Router) => {
    router.get('/api/bookings', getAllBookings);
    router.post('/api/bookings', createdBooking);
    router.post('/api/bookings/page', getBookingsByPage);
    router.delete('/api/bookings/:id', deleteBooking);
    router.post('/api/bookings/batchdelete', deleteBookings);
    router.patch("/api/bookings/:id", updateBooking);
    router.patch('/api/bookings/query/:condition', getBookingsByCondition);
    router.get('/api/bookings/query_date/:date', getBookingsByUpDate);
    router.get('/api/bookings/cancel/:id', cancelBooking);
};
