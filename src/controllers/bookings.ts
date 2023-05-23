/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 10:32:25
 */
import express from 'express';

import { Page, PageResult, Result, getBookingDocuments, convertDateFormat, convertNextDayFormat, Service } from '../common/common';
import { logger } from '../common/log';
import {  getBookingByCode, createBooking, getBookings, getBookingById, deleteBookingById, deleteBookingsByIds, getBookingByCondition, getBookingsByDate, getBookingsByLimt } from '../db/bookings';
import { getMatchingsByIds } from '../db/matchings';
import { getServicesByIds } from '../db/services';

export const getAllBookings = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const bookings = await getBookings();
        const docs = await getBookingDocuments(bookings);
        result.result = docs;
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const getBookingsByCondition = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const { condition } = req.params;
        const reg = new RegExp(condition.trim(), 'i');
        const query: Page = req.body;
        let page = query.page === 0 || Object.keys(query).length === 0 ? 1 : query.page;
        let limit = query.limit === 0 || Object.keys(query).length === 0 ? 10 : query.limit;
        const bookings = await getBookingByCondition(reg, page, limit);
        result.result = bookings;
        // result.total = total;
        // result.page = page;
        // result.limit = limit;
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const getBookingsByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        let page = query.page === 0 || Object.keys(query).length === 0 ? 1 : query.page;
        let limit = query.limit === 0 || Object.keys(query).length === 0 ? 10 : query.limit;
        // const total = await getBookingsCount();
        // const bookings = await getBookingsByLimt(page, limit);
        result.result = await getBookingsByLimt(page, limit);
        // result.total = total;
        // result.page = page;
        // result.limit = limit;
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const getBookingsByUpDate = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { date } = req.params;
        result.result = await getBookingsByDate(convertDateFormat(new Date(date)), convertNextDayFormat(new Date()));
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const createdBooking = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        // const { filename, path } = req.file;
        const {
            code,
            price,
            quantity,
            lowestPrice,
            discount,
            handletime,
            startTime,
            endTime,
            createDate,
            updateDate,
            paystatus,
            status,
            notes,
            notes2,
            customerIds,
            staffIds,
            services,
            matchings,
        } = req.body;
        if (!code) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }

        const existCode = await getBookingByCode(code);
        if (existCode) {
            result.code = 400;
            result.msg = "该code已存在!";
            return res.status(400).json(result);
        }

        const matchingIds: string[] = [];
        const serviceIds: string[] = [];
        for(const matching of matchings) {
            
        }

        result.result = await createBooking({
            code,
            price,
            quantity,
            lowestPrice,
            discount,
            handletime,
            startTime: convertDateFormat(new Date(startTime)),
            endTime: convertDateFormat(new Date(endTime)),
            createDate: convertDateFormat(new Date()),
            updateDate: convertDateFormat(new Date()),
            paystatus,
            status,
            notes,
            notes2,
            customerIds,
            staffIds,
            serviceIds,
            matchingIds,
        });
        // 创建扣减服务次数,这个不是单纯添加ID服务性质不一样
        // const matchings = await getMatchingsByIds(matchingIds);
        // for (const match of matchings) {

        // }
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();

    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const deleteBooking = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        result.result = await deleteBookingById(id);
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const deleteBookings = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await deleteBookingsByIds(ids);
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const updateBooking = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const {
            code,
            price,
            quantity,
            lowestPrice,
            discount,
            handletime,
            startTime,
            endTime,
            createDate,
            updateDate,
            paystatus,
            status,
            notes,
            notes2,
            customerIds,
            staffIds,
            serviceIds,
            matchingIds,
        } = req.body;
        if (!code) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }

        const booking = await getBookingById(id);
        booking.code = code;
        booking.price = price;
        booking.quantity = quantity;
        booking.lowestPrice = lowestPrice;
        booking.discount = discount;
        booking.handletime = handletime;
        booking.startTime = convertDateFormat(new Date(startTime));
        booking.endTime = convertDateFormat(new Date(endTime));
        booking.updateDate = convertDateFormat(new Date());
        booking.paystatus = paystatus;
        booking.status = status;
        booking.notes = notes;
        booking.notes2 = notes2;
        booking.customerIds = customerIds;
        booking.staffIds = staffIds;
        booking.serviceIds = serviceIds;
        booking.matchingIds = matchingIds;

        await booking.save();
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();

    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};