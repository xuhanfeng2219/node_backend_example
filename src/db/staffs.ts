/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 17:56:32
 */
import { logger } from "../common/log";
import mongoose, { Error } from "mongoose";
import multer from "multer";

const StaffSchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true},
    nickname: { type: String },
    staffname: { type: String, required: true},
    surname: { type: String },
    fin: { type: String },
    gender: { type: String},
    birthday: { type: Date },
    race: { type: String},
    nationality: { type: String},
    title: { type: String },
    startJobDate: { type: Date },
    endJobDate: { type: Date },
    endProbationDate: {type: Date},
    image: { type: String},
    faith: { type: String },
    isDisplay: {type: String, default: "Yes"},
    // contact detail
    mobile: { type: String },
    homePhone: { type: String },
    officeCall: {type: String},
    otherCall: {type: String},
    faxNumer: {type: String},
    email: {type: String},
    // address
    localAddress: {type: String},
    localCity: {type: String},
    localPostCode: {type: String},
    otherAddress: {type: String},
    otherCity: {type: String},
    otherPostCode: {type: String},
    localState: {type: String},
    localCountry: {type: String},
    otherState: {type: String},
    otherCountry: {type: String},
    // other
    colorCode: {type: String, required: true},
    remark: {type: String},
    sort: {type: Number},
    createDate: {type: Date, default: Date.now()},
    updateDate: {type: Date, default: Date.now()},
    status: {type: String}
});

export const StaffModel = mongoose.model('Staff', StaffSchema);

export const getStaffs = () => StaffModel.find().sort({sort: 1});
export const getStaffsCount = () => StaffModel.count();
export const getStaffByStaffname = (staffname: string) => StaffModel.findOne( {staffname});
export const getStaffByCode = (code: string) => StaffModel.findOne( {code});
export const getStaffById = (id: string) => StaffModel.findById({_id: id});
export const createStaff = (values: Record<string, any>) => new StaffModel(values).save().then((staff) => staff.toObject());
export const deleteStaffById = (id: string) => StaffModel.findOneAndDelete({_id: id});
export const deleteStaffsByIds = (ids: string[]) => StaffModel.deleteMany({_id: {$in: ids}});
export const updateStaffById = (id: string, values: Record<string, any>) => StaffModel.findByIdAndUpdate(id, values); 

export const upload = multer({dest: 'uploads/'});