/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 17:39:51
 */
import express from 'express';

import { PageResult, convertDateFormat, convertNextDayFormat } from '../common/common';
import { logger } from '../common/log';
import { getCustomerById, getCustomerIdsByCondition } from '../db/customers';
import { getOrdersByLimit, getyOrdersByCondition } from '../db/orders';
import { getStaffById, getStaffIdsByCondition } from '../db/staffs';

export const queryOrdersByCondition = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const {
            date,
            customer,
            staff,
            page,
            limit,
        } = req.body;
        const p = page === "" || page === 0 || Object.keys(page).length === 0 ? 1 : page;
        const l = limit === "" || limit === 0 || Object.keys(limit).length === 0 ? 10 : limit;
        let orders;
        if ((date === "" || Object.keys(date).length === 0) && (customer === "" || Object.keys(customer).length === 0) && (staff === "" || Object.keys(staff).length === 0)) {
            orders = await getOrdersByLimit(p, l);
        }
        if (!(date instanceof Date)) {

        }
        const staffReg = new RegExp(staff, 'i');
        const staffIds = await getStaffIdsByCondition(staffReg, '_id') as unknown as string[];
        const customerReg = new RegExp(customer, 'i');
        const customerIds = await getCustomerIdsByCondition(customerReg, '_id') as unknown as string[];
        const startDate = convertDateFormat(new Date(date));
        const endDate = convertNextDayFormat(new Date(date));
        orders = await getyOrdersByCondition(customerIds, staffIds, startDate, endDate, p, l);
        // return orders
        for (const order of orders.docs) {
            const c = await getCustomerById(order.get('customerId'), "firstname lastname mobile");
            order.set('customerId', c);
            const s = await getStaffById(order.get('satffId'), "staffname mobile");
            order.set('satffId', s);
        }
        result.result = orders;
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        result.result = error.message;
        return res.status(400).json(result);
    }
};

