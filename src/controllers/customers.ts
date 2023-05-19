/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-19 10:38:30
 */
import express from 'express';

import { Page , PageResult, Result, Condition, Customer, parseDate, convertDateFormat } from '../common/common';
import { logger } from '../common/log';
import { getCustomersCountByCondition,getCustomersCount, getCustomerByICNo, getCustomers, getCustomerByMobile, getCustomerById, createCustomer, deleteCustomerById, deleteCustomersByIds, queryCustomersByCondition, createCustomers } from '../db/customers';
import csv from 'csvtojson';


export const getAllCustomers = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        result.result = await getCustomers();
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const getCustomersByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        const page = query.page === 0 ? 1 : query.page;
        const limit = query.limit === 0 ? 10 : query.limit;
        const total = await getCustomersCount();
        const staffs = await getCustomers().skip((page - 1)*limit).limit(limit);
        result.result = staffs;
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
        return res.sendStatus(400).json(result);
    }
};

export const createdCustomer = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { 
            code,
            salutation,
            firstname,
            lastname,
            joinDate,
            customerGroup,
            membershipNo,
            consultant,
            ICNo,
            gender,
            birthday,
            race,
            religion,
            nationality,
            maritalStatus,
            occupation,
            mobile,
            homeTelephone,
            officeTelephone,
            otherTelephone,
            fax,
            email,
            address,
            city,
            state,
            postCode,
            country,
            contactPreference,
            notes,
            notes2,
            loyaltyPoint,
            createDate,
            updateDate,
            isDisplay
         } = req.body;
        if (!code) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }
        
        const existCustomer = await getCustomerByMobile(mobile) || await getCustomerByICNo(ICNo);
        logger.info(`Customer:`, existCustomer);
        if (existCustomer) {
            result.code = 400;
            result.msg = "该客户已存在!";
            return res.status(400).json(result);
        }
        
        result.result = await createCustomer({
            code,
            salutation,
            firstname,
            lastname,
            joinDate,
            customerGroup,
            membershipNo,
            consultant,
            ICNo,
            gender,
            birthday,
            race,
            religion,
            nationality,
            maritalStatus,
            occupation,
            mobile,
            homeTelephone,
            officeTelephone,
            otherTelephone,
            fax,
            email,
            address,
            city,
            state,
            postCode,
            country,
            contactPreference,
            notes,
            notes2,
            loyaltyPoint,
            createDate: convertDateFormat(new Date()),
            updateDate: convertDateFormat(new Date()),
            isDisplay
        });
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();
        
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const deleteCustomer = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        result.result = await deleteCustomerById(id);
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result); 
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const deleteCustomers = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await deleteCustomersByIds(ids);
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result); 
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const getCustomersByCondition = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const { condition } = req.params;
        const query: Page = req.body;
        const page = query.page === 0 ? 1 : query.page;
        const limit = query.limit === 0 ? 10 : query.limit;
        const reg = new RegExp(condition.trim(), 'i');
        const total = await getCustomersCountByCondition(reg);
        const customers = await queryCustomersByCondition(reg).skip((page - 1)*limit).limit(limit);
        result.result = customers;
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
        return res.sendStatus(400).json(result);
    }
};

export const updateCustomer = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const { 
            code,
            salutation,
            firstname,
            lastname,
            joinDate,
            customerGroup,
            membershipNo,
            consultant,
            ICNo,
            gender,
            birthday,
            race,
            religion,
            nationality,
            maritalStatus,
            occupation,
            mobile,
            homeTelephone,
            officeTelephone,
            otherTelephone,
            fax,
            email,
            address,
            city,
            state,
            postCode,
            country,
            contactPreference,
            notes,
            notes2,
            loyaltyPoint,
            createDate,
            updateDate,
            isDisplay
        } = req.body;
        if (!code) {
            result.code = 400;
            result.msg = "请填写必填项!";
            return res.status(400).json(result);
        }

        const customer = await getCustomerById(id);

        customer.code = code;
        customer.salutation = salutation;
        customer.firstname = firstname;
        customer.lastname =  lastname;
        customer.joinDate =  joinDate;
        customer.customerGroup =  customerGroup;
        customer.membershipNo =  membershipNo;
        customer.consultant =  consultant;
        customer.ICNo =  ICNo;
        customer.gender =  gender;
        customer.birthday =  birthday;
        customer.race =  race;
        customer.religion =  religion;
        customer.nationality =  nationality;
        customer.maritalStatus =  maritalStatus;
        customer.occupation =  occupation;
        customer.mobile =  mobile;
        customer.homeTelephone =  homeTelephone;
        customer.officeTelephone =  officeTelephone;
        customer.otherTelephone =  otherTelephone;
        customer.fax =  fax;
        customer.email =  email;
        customer.address =  address;
        customer.city =  city;
        customer.state =  state;
        customer.postCode =  postCode;
        customer.country =  country;
        customer.contactPreference =  contactPreference;
        customer.notes =  notes;
        customer.notes2 =  notes2;
        customer.loyaltyPoint =  loyaltyPoint;
        customer.createDate =  convertDateFormat(new Date(createDate));
        customer.updateDate =  convertDateFormat(new Date());
        customer.isDisplay =  isDisplay;
        await customer.save();

        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();

    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const importCustomers = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const {filename, path}  = req.file;
        if (!filename) {
            result.code = 400;
            result.msg = "未提供csv文件!";
            return res.status(400).json(result);
        }
        // const customers: Customer[] = []; 
        csv()
            .fromFile(path)
            .then(async (data: any) => {
            try {
                const isExist = await getCustomerByICNo(data.ICNo) || await getCustomerByMobile(data.mobile);
                if (isExist) {
                    result.code = 400;
                    result.msg = "客户已存在!";
                    return res.status(400).json(result);
                }
                const customers: Customer[] = data;
                for (const customer of customers) {
                    if (customer.birthday) {
                        customer.birthday = parseDate(customer.birthday.toString());
                    }
                    if (customer.joinDate) {
                        customer.joinDate = parseDate(customer.joinDate.toString());
                    }
                }
                result.result = await createCustomers(customers);
                
            } catch (error) {
                logger.error('插入数据到 MongoDB 时发生错误:', error);
                result.code = 400;
                result.msg = error.message;
                return res.status(400).json(result);
            }
        });
        
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result).end();
        
    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};

export const displayCustomers = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { list } = req.body;
        const customers = list as Array<Condition>;
        for (const customer of customers) {
            const c = await getCustomerById(customer.id);
            c.isDisplay = customer.isDisplay;
            c.updateDate = convertDateFormat(new Date());
            await c.save();
        }
        result.code = 200;
        result.msg = "success";
        return res.status(200).json(result);

    } catch (error) {
        logger.error(error);
        result.code = 400;
        result.msg = "fail";
        return res.sendStatus(400).json(result);
    }
};