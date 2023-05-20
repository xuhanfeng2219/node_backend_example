/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-20 10:29:43
 */
import express from 'express';

import { Page, PageResult, Result, Condition, convertDateFormat, Matching, matchServices } from '../common/common';
import { logger } from '../common/log';
import { getMatchingsCountByCondition, getMatchingByCode, createMatching, getMatchings, getMatchingById, getMatchingsCount, deleteMatchingById, deleteMatchingsByIds, getMatchingByCondition } from '../db/matchings';

export const getAllMatchings = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const matchings = await getMatchings() as unknown as Array<Matching>;
        result.result = await matchServices(matchings);
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

export const getMatchingsByCondition = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const { condition } = req.params;
        const reg = new RegExp(condition.trim(), 'i');
        const query: Page = req.body;
        const page = query.page === 0 || Object.keys(query).length === 0 ? 1 : query.page;
        const limit = query.limit === 0 || Object.keys(query).length === 0 ? 10 : query.limit;
        const total = await getMatchingsCountByCondition(reg);
        const matchings = await getMatchingByCondition(reg).skip((page - 1) * limit).limit(limit) as unknown as Array<Matching>;
        result.result = await matchServices(matchings);
        result.total = total;
        result.page = page;
        result.limit = limit;
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

export const getMatchingsByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        const page = query.page === 0 || Object.keys(query).length === 0 ? 1 : query.page;
        const limit = query.limit === 0 || Object.keys(query).length === 0 ? 10 : query.limit;
        const total = await getMatchingsCount();
        const matchings = await getMatchings().skip((page - 1) * limit).limit(limit) as unknown as Array<Matching>;
        result.result = await matchServices(matchings);
        result.total = total;
        result.page = page;
        result.limit = limit;
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

export const createdMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        // const { filename, path } = req.file;
        const {
            code,
            matchingname,
            category,
            group,
            cost,
            price,
            quantity,
            lowestPrice,
            discount,
            handletime,
            usedays,
            isDonate,
            isFavorite,
            isDisplay,
            createDate,
            updateDate,
            status,
            image,
            note,
            serviceIds
        } = req.body;
        if (!code || !matchingname) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }

        const existCode = await getMatchingByCode(code);
        if (existCode) {
            result.code = 400;
            result.msg = "该code已存在！";
            return res.status(400).json(result);
        }

        result.result = await createMatching({
            code,
            matchingname,
            category,
            group,
            cost,
            price,
            quantity,
            lowestPrice,
            discount,
            handletime,
            usedays,
            isDonate,
            isFavorite,
            isDisplay,
            createDate: convertDateFormat(new Date()),
            updateDate: convertDateFormat(new Date()),
            status,
            image,
            note,
            serviceIds
        });
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

export const deleteMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        result.result = await deleteMatchingById(id);
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

export const deleteMatchings = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await deleteMatchingsByIds(ids);
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

export const updateMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const {
            code,
            matchingname,
            category,
            group,
            cost,
            price,
            quantity,
            lowestPrice,
            discount,
            handletime,
            usedays,
            isDonate,
            isFavorite,
            isDisplay,
            createDate,
            updateDate,
            status,
            image,
            note,
            serviceIds,
        } = req.body;
        if (!code || !matchingname) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }

        const matching = await getMatchingById(id);
        matching.code = code;
        matching.matchingname = matchingname;
        matching.category = category;
        matching.group = group;
        matching.cost = cost;
        matching.price = price;
        matching.quantity = quantity;
        matching.lowestPrice = lowestPrice;
        matching.discount = discount;
        matching.handletime = handletime;
        matching.usedays = usedays;
        matching.isDonate = isDonate;
        matching.isFavorite = isFavorite;
        matching.isDisplay = isDisplay;
        matching.createDate = createDate;
        matching.updateDate = convertDateFormat(new Date());
        matching.status = status;
        matching.image = image;
        matching.note = note;
        matching.serviceIds = serviceIds;

        await matching.save();
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

export const displayMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { list } = req.body;
        const matchings = list as Array<Condition>;
        for (const matching of matchings) {
            const s = await getMatchingById(matching.id);
            if (s !== null && Object.keys(s).length > 0 && s !== undefined) {
                s.isDisplay = matching.isDisplay;
                s.updateDate = convertDateFormat(new Date());
                await s.save();
            }
        }
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

export const favoriteMatching = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { list } = req.body;
        const matchings = list as Array<Condition>;
        for (const matching of matchings) {
            const s = await getMatchingById(matching.id);
            if (s !== null && Object.keys(s).length > 0 && s !== undefined) {
                s.isFavorite = matching.isFavorite;
                s.updateDate = convertDateFormat(new Date());
                await s.save();
            }
        }
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