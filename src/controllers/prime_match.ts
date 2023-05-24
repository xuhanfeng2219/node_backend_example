/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 13:24:59
 */
import express from 'express';

import { Page, PageResult, Result, convertDateFormat } from '../common/common';
import { logger } from '../common/log';
import { getCustomerById } from '../db/customers';
import { getMatchingById } from '../db/matchings';
import { createPrimeMatching, deletePrimeMatchingById, deletePrimeMatchingsByIds, getPrimeMatchingById, getPrimeMatchingsByLimit } from '../db/prime_match';
import { getStaffById } from '../db/staffs';

export const getPrimeMatchingsByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        const page = query.page === 0 || Object.keys(query).length === 0 ? 1 : query.page;
        const limit = query.limit === 0 || Object.keys(query).length === 0 ? 10 : query.limit;
        const matchings = await getPrimeMatchingsByLimit(page, limit);
        result.result = matchings;
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

export const createdPrimeMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const {
            customerId,
            staffId,
            matching,
            createDate,
            updateDate,
        } = req.body;

        if (!customerId) {
            result.code = 400;
            result.msg = "请添加客户ID!";
            return res.status(400).json(result);
        }

        if (!staffId) {
            result.code = 400;
            result.msg = "请添加员工ID!";
            return res.status(400).json(result);
        }

        if (!matching || Object.keys(matching).length === 0) {
            result.code = 400;
            result.msg = "请添加客户配套!";
            return res.status(400).json(result);
        }

        const c = await getCustomerById(customerId, "");
        if (!c || Object.keys(c).length === 0) {
            result.code = 400;
            result.msg = "没有找到对应的客户信息!";
            result.result = {};
            return res.status(400).json(result);
        }

        const staff = await getStaffById(staffId, "");
        if (!staff || Object.keys(staff).length === 0) {
            result.code = 400;
            result.msg = "没有找到对应的员工信息!";
            result.result = {};
            return res.status(400).json(result);
        }

        const match = await getMatchingById(matching.mathingId);
        if (!match || Object.keys(match).length === 0) {
            result.code = 400;
            result.msg = "没有找到对应的配套信息!";
            result.result = {};
            return res.status(400).json(result);
        }

        result.result = await createPrimeMatching({
            customerId,
            matching,
            createDate: convertDateFormat(new Date()),
            updateDate: convertDateFormat(new Date()),
        });
        // 更新会员状态
        const customer = await getCustomerById(customerId, "");
        customer.isPrime = 'Yes';
        await customer.save();
        // 产生销售记录,插入销售单

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

export const updatePrimeMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const {
            customerId,
            staffId,
            matching,
        } = req.body;

        if (!id) {
            result.code = 400;
            result.msg = "请添加更改ID!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (!customerId) {
            result.code = 400;
            result.msg = "请添加客户Id!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (!staffId) {
            result.code = 400;
            result.msg = "请添加员工Id!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (!matching) {
            result.code = 400;
            result.msg = "请添加配套信息!";
            result.result = {};
            return res.status(400).json(result);
        }

        const customer = await getCustomerById(customerId, "");
        if (!customer || Object.keys(customer).length === 0) {
            result.code = 400;
            result.msg = "没有找到对应的客户信息!";
            result.result = {};
            return res.status(400).json(result);
        }

        const staff = await getStaffById(staffId, "");
        if (!staff || Object.keys(staff).length === 0) {
            result.code = 400;
            result.msg = "没有找到对应的员工信息!";
            result.result = {};
            return res.status(400).json(result);
        }

        const match = await getMatchingById(matching.id);
        if (!match || Object.keys(match).length === 0) {
            result.code = 400;
            result.msg = "没有找到对应的配套信息!";
            result.result = {};
            return res.status(400).json(result);
        }

        // save
        const primeMatch = await getPrimeMatchingById(id, "");
        primeMatch.customerId = customerId;
        primeMatch.staffId = staffId;
        primeMatch.matching = matching;
        primeMatch.updateDate = convertDateFormat(new Date());
        await primeMatch.save();

        // 产生销售记录,插入销售单

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


export const deletePrimeMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        result.result = await deletePrimeMatchingById(id);
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

export const deletePrimeMatchings = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await deletePrimeMatchingsByIds(ids);
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
