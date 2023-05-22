/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 18:37:39
 */
import express from 'express';

import { Page, PageResult, Result, Condition, convertDateFormat } from '../common/common';
import { logger } from '../common/log';
import { getServicesCountByCondition, getServiceByCode, createService, getServices, getServiceById, getServicesCount, deleteServiceById, deleteServicesByIds, getServiceByCondition, getServicesByIds, getServicesByLimit } from '../db/services';


export const getAllServices = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        result.result = await getServices();
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

export const getServicesByCondition = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const { condition } = req.params;
        const reg = new RegExp(condition.trim(), 'i');
        const query: Page = req.body;
        const page = query.page === 0 || Object.keys(query).length === 0 ? 1 : query.page;
        const limit = query.limit === 0 || Object.keys(query).length === 0 ? 10 : query.limit;
        const total = await getServicesCountByCondition(reg);
        result.result = await getServiceByCondition(reg, page, limit);
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

export const getServicesByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        const page = query.page === 0 ? 1 : query.page;
        const limit = query.limit === 0 ? 10 : query.limit;
        const total = await getServicesCount();
        const Services = await getServicesByLimit(page, limit);
        result.result = Services;
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

export const createdService = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        // const { filename, path } = req.file;
        const {
            code,
            servicename,
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
        } = req.body;
        if (!code || !servicename) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }

        const existCode = await getServiceByCode(code);
        if (existCode) {
            result.code = 400;
            result.msg = "该code已存在!";
            return res.status(400).json(result);
        }

        result.result = await createService({
            code,
            servicename,
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
            note
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

export const deleteService = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        result.result = await deleteServiceById(id);
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

export const deleteServices = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await deleteServicesByIds(ids);
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

export const queryServicesByIds = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await getServicesByIds(ids);
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

export const updateService = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const {
            code,
            servicename,
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
            note
        } = req.body;
        if (!code || !servicename) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }

        const service = await getServiceById(id);
        service.code = code;
        service.servicename = servicename;
        service.category = category;
        service.group = group;
        service.cost = cost;
        service.price = price;
        service.quantity = quantity;
        service.lowestPrice = lowestPrice;
        service.discount = discount;
        service.handletime = handletime;
        service.usedays = usedays;
        service.isDonate = isDonate;
        service.isFavorite = isFavorite;
        service.isDisplay = isDisplay;
        service.createDate = createDate;
        service.updateDate = convertDateFormat(new Date());
        service.status = status;
        service.image = image;
        service.note = note;

        await service.save();
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

export const displayService = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { list } = req.body;
        const services = list as Array<Condition>;
        for (const service of services) {
            const s = await getServiceById(service.id);
            if (s !== null && s !== undefined && Object.keys(s).length > 0) {
                s.isDisplay = service.isDisplay;
                s.updateDate = convertDateFormat(new Date());;
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

export const favoriteService = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { list } = req.body;
        const services = list as Array<Condition>;
        for (const service of services) {
            const s = await getServiceById(service.id);
            if (s !== null && s !== undefined && Object.keys(s).length > 0) {
                s.isFavorite = service.isFavorite;
                s.updateDate = convertDateFormat(new Date());;
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