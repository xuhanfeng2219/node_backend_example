/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:58:20
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 10:51:46
 */
import express from 'express';

import { Page , Result} from '../common/common';
import { logger } from '../common/log';
import { getStaffByCode, createStaff, getStaffs, getStaffById, getStaffsCount, deleteStaffById } from '../db/staffs';


export const getAllStaffs = async (req: express.Request, res: express.Response) => {
    try {
        const staffs = await getStaffs();

        return res.status(200).json(staffs).end();
    } catch (error) {
        logger.error(error);
        return res.sendStatus(400).json({error: error.message});
    }
};

export const getStaffsByPage = async (req: express.Request, res: express.Response) => {
    try {
        const query: Page = req.body;
        const page = query.page === 0 ? 1 : query.page;
        const limit = query.limit === 0 ? 10 : query.limit;
        const total = await getStaffsCount();
        const staffs = await getStaffs().skip((page - 1)*limit).limit(limit);
        const result = new Result();
        result.results = staffs;
        result.total = total;
        result.page = page;
        result.limit = limit;
        return res.status(200).json(result);
    } catch (error) {
        logger.error(error);
        return res.sendStatus(400).json({error: error.message});
    }
};

export const createdStaff = async (req: express.Request, res: express.Response) => {
    try {
        const { filename, path } = req.file;
        const { code,
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
            createDate,
            updateDate } = req.body;
        if (!code || !staffname || !colorCode) {
            return res.status(400).json({msg : '请填写必填项!'});
        }
        
        const existCode = await getStaffByCode(code);
        if (existCode) {
            return res.status(400).json({msg : '该code已存在！'});
        }
        
        const staff = await createStaff({
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
            createDate,
            updateDate
        });

        return res.status(200).json(staff).end();
        
    } catch (error) {
        logger.error(error);
        return res.sendStatus(400).json({error: error.message});
    }
};

export const deleteStaff = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const deleteSatff = await deleteStaffById(id);

        return res.status(200).json(deleteSatff); 
    } catch (error) {
        logger.error(error);
        return res.sendStatus(400).json({error: error.message});
    }
};

export const updateStaff = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { code,
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
            createDate,
            updateDate } = req.body;

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
        staff.createDate= createDate;
        staff.updateDate= new Date();
        
        await staff.save();

        return res.status(200).json(staff).end();

    } catch (error) {
        logger.error(error);
        return res.sendStatus(400).json({error: error.message});
    }
};