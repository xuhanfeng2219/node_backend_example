/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-18 16:10:16
 */
import express from 'express';

import { Page , PageResult, Result, Condition} from '../common/common';
import { logger } from '../common/log';
import { getStaffByCode, createStaff, getStaffs, getStaffById, getStaffsCount, deleteStaffById, deleteStaffsByIds, getStaffByStaffname } from '../db/staffs';


export const getAllStaffs = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        result.result = await getStaffs();
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

export const getStaffsByStaffname = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { staffname } = req.params;
        const regex = new RegExp(staffname, 'i');
        const query = { name: { $regex: regex } };
        result.result = await getStaffByStaffname(query);
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

export const getStaffsByPage = async (req: express.Request, res: express.Response) => {
    const result = new PageResult();
    try {
        const query: Page = req.body;
        const page = query.page === 0 ? 1 : query.page;
        const limit = query.limit === 0 ? 10 : query.limit;
        const total = await getStaffsCount();
        const staffs = await getStaffs().skip((page - 1)*limit).limit(limit);
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

export const createdStaff = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { filename, path } = req.file;
        const { 
            code,
            nickname,
            staffname,
            surname,
            fin,
            gender,
            birthday,
            race,
            nationality,
            title,
            startJobDate,
            endJobDate,
            endProbationDate,
            image,
            faith,
            isDisplay,
            mobile,
            homePhone,
            officeCall,
            otherCall,
            faxNumer,
            email,
            localAddress,
            localCity,
            localPostCode,
            otherAddress,
            otherCity,
            otherPostCode,
            localState,
            localCountry,
            otherState,
            otherCountry,
            colorCode,
            remark,
            sort,
            createDate,
            updateDate,
            status } = req.body;
        if (!code || !staffname || !colorCode) {
            return res.status(400).json({msg : '请填写必填项!'});
        }
        
        const existCode = await getStaffByCode(code);
        if (existCode) {
            return res.status(400).json({msg : '该code已存在！'});
        }
        const total = await getStaffsCount();
        
        result.result = await createStaff({
            code,
            nickname,
            staffname,
            surname,
            fin,
            gender,
            birthday,
            race,
            nationality,
            title,
            startJobDate,
            endJobDate,
            endProbationDate,
            image : `/uploads/${filename}`,
            faith,
            isDisplay,
            mobile,
            homePhone,
            officeCall,
            otherCall,
            faxNumer,
            email,
            localAddress,
            localCity,
            localPostCode,
            otherAddress,
            otherCity,
            otherPostCode,
            localState,
            localCountry,
            otherState,
            otherCountry,
            colorCode,
            remark,
            sort: total + 1,
            createDate,
            updateDate,
            status
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

export const deleteStaff = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;

        result.result = await deleteStaffById(id);
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

export const deleteStaffs = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { ids } = req.body;
        result.result = await deleteStaffsByIds(ids);
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

export const updateStaff = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { id } = req.params;
        const { 
            code,
            nickname,
            staffname,
            surname,
            fin,
            gender,
            birthday,
            race,
            nationality,
            title,
            startJobDate,
            endJobDate,
            endProbationDate,
            image,
            faith,
            isDisplay,
            mobile,
            homePhone,
            officeCall,
            otherCall,
            faxNumer,
            email,
            localAddress,
            localCity,
            localPostCode,
            otherAddress,
            otherCity,
            otherPostCode,
            localState,
            localCountry,
            otherState,
            otherCountry,
            colorCode,
            remark,
            sort,
            createDate,
            updateDate,
            status } = req.body;
        if (!code || !staffname || !colorCode) {
            return res.status(400).json({msg : '请填写必填项!'});
        }

        const staff = await getStaffById(id);
        staff.code= code;
        staff.nickname= nickname;
        staff.staffname= staffname;
        staff.surname= surname;
        staff.fin= fin;
        staff.gender= gender;
        staff.birthday= birthday;
        staff.race= race;
        staff.nationality= nationality;
        staff.title= title;
        staff.startJobDate= startJobDate;
        staff.endJobDate= endJobDate;
        staff.endProbationDate= endProbationDate;
        staff.image= image;
        staff.faith= faith;
        staff.isDisplay= isDisplay;
        staff.mobile= mobile;
        staff.homePhone= homePhone;
        staff.officeCall= officeCall;
        staff.otherCall= otherCall;
        staff.faxNumer= faxNumer;
        staff.email= email;
        staff.localAddress= localAddress;
        staff.localCity= localCity;
        staff.localPostCode= localPostCode;
        staff.otherAddress= otherAddress;
        staff.otherCity= otherCity;
        staff.otherPostCode= otherPostCode;
        staff.localState= localState;
        staff.localCountry= localCountry;
        staff.otherState= otherState;
        staff.otherCountry= otherCountry;
        staff.colorCode= colorCode;
        staff.remark= remark;
        staff.sort = sort;
        staff.createDate= createDate;
        staff.updateDate= new Date();
        staff.status = status;
        
        await staff.save();
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

export const sortStaff = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { list } = req.body;
        const staffs = list as Array<Condition>;
        for (const staff of staffs) {
            const stf = await getStaffById(staff.id);
            stf.sort = staff.sort;
            stf.updateDate = new Date();
            await stf.save() as Condition;
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

export const displayStaff = async (req: express.Request, res: express.Response) => {
    const result = new Result();
    try {
        const { list } = req.body;
        const staffs = list as Array<Condition>;
        for (const staff of staffs) {
            const stf = await getStaffById(staff.id);
            stf.isDisplay = staff.isDisplay;
            stf.updateDate = new Date();
            await stf.save() as Condition;
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