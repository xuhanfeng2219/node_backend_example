/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 15:50:12
 */
import express from 'express';

import { Page, PageResult, Result, convertDateFormat } from '../common/common';
import { logger } from '../common/log';
import { createCategory, deleteCategoryById, deleteCategorysByIds, getCategoryByCode, getCategoryById, getCategoryByName, getCategorysByLimit } from '../db/category';
import { ObjectId } from 'mongodb';

export const getCategorysByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        const page = query.page === 0 || Object.keys(query).length === 0 ? 1 : query.page;
        const limit = query.limit === 0 || Object.keys(query).length === 0 ? 10 : query.limit;
        const categorys = await getCategorysByLimit(page, limit);
        result.result = categorys;
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

export const createdCategory = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const {
            code,
            categoryname,
        } = req.body;

        if (!code) {
            result.code = 400;
            result.msg = "请添加编码!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (code === "" || Object.keys(code).length === 0) {
            result.code = 400;
            result.msg = "请添加编码!";
            result.result = {};
            return res.status(400).json(result);
        }

        const exsitCode = await getCategoryByCode(code);
        if (exsitCode) {
            result.code = 400;
            result.msg = "该编码已存在请重新输入!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (!categoryname) {
            result.code = 400;
            result.msg = "请添加类别!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (categoryname === "" || Object.keys(categoryname).length === 0) {
            result.code = 400;
            result.msg = "请添加类别!";
            result.result = {};
            return res.status(400).json(result);
        }

        const exsitName = await getCategoryByName(categoryname);

        if (exsitName) {
            result.code = 400;
            result.msg = "该类别名称已存在请重新输入!";
            result.result = {};
            return res.status(400).json(result);
        }


        result.result = await createCategory({
            code,
            categoryname,
            createDate: convertDateFormat(new Date()),
            updateDate: convertDateFormat(new Date()),
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

export const updateCategory = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const {
            code,
            categoryname,
        } = req.body;

        if (!code) {
            result.code = 400;
            result.msg = "请添加编码!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (code === "" || Object.keys(code).length === 0) {
            result.code = 400;
            result.msg = "请添加编码!";
            result.result = {};
            return res.status(400).json(result);
        }

        const exsitCode = await getCategoryByCode(code);
        if (exsitCode) {
            result.code = 400;
            result.msg = "该编码已存在请重新输入!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (!categoryname) {
            result.code = 400;
            result.msg = "请添加类别!";
            result.result = {};
            return res.status(400).json(result);
        }

        if (categoryname === "" || Object.keys(categoryname).length === 0) {
            result.code = 400;
            result.msg = "请添加类别!";
            result.result = {};
            return res.status(400).json(result);
        }

        const exsitName = await getCategoryByName(categoryname);
        if (exsitName) {
            result.code = 400;
            result.msg = "该类别名称已存在请重新输入!";
            result.result = {};
            return res.status(400).json(result);
        }

        // save
        const category = await getCategoryById(id, "");
        category.code = code;
        category.categoryname = categoryname;
        category.updateDate = convertDateFormat(new Date());
        await category.save();

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


export const deleteCategory = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        result.result = await deleteCategoryById(id);
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.result = error.message;
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};

export const deleteCategorys = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await deleteCategorysByIds(ids);
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        result.result = error.message;
        result.code = 400;
        result.msg = "fail";
        return res.status(400).json(result);
    }
};
