/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-21 19:16:09
 */
import mongoose from "mongoose";
import multer from "multer";
import { convertDateFormat } from "../common/common";

const CustomerSchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true },
    salutation: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    joinDate: { type: Date },
    customerGroup: { type: String },
    membershipNo: { type: String },
    consultant: { type: String },
    ICNo: { type: String },
    gender: { type: String },
    birthday: { type: Date },
    race: { type: String },
    religion: { type: String },
    nationality: { type: String },
    maritalStatus: { type: String },
    occupation: { type: String },
    // contact detail
    mobile: { type: String },
    homeTelephone: { type: String },
    officeTelephone: { type: String },
    otherTelephone: { type: String },
    // address
    fax: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    postCode: { type: String },
    country: { type: String },
    contactPreference: { type: String },
    notes: { type: String },
    notes2: { type: String },
    loyaltyPoint: { type: Number },
    // other
    createDate: { type: Date },
    updateDate: { type: Date },
    isDisplay: { type: String, default: "Yes" },
});

// CustomerSchema.index({lastname: 'text', ICNo: 'text', email: 'text', code: 'text'});

export const CustomerModel = mongoose.model('Customer', CustomerSchema);

export const getCustomers = () => CustomerModel.find();
export const getCustomersCount = () => CustomerModel.count();
export const getCustomersCountByCondition = (reg: RegExp) => CustomerModel.count({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] });
export const queryCustomersByCondition = (reg: RegExp) => CustomerModel.find({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] });
export const getCustomerByMobile = (mobile: string) => CustomerModel.findOne({ mobile: mobile });
export const getCustomerByICNo = (icNo: string) => CustomerModel.findOne({ ICNo: icNo });
export const getCustomerById = (id: string) => CustomerModel.findById({ _id: id });
export const createCustomer = (values: Record<string, any>) => new CustomerModel(values).save().then((customer) => customer.toObject());
export const deleteCustomerById = (id: string) => CustomerModel.findOneAndDelete({ _id: id });
export const deleteCustomersByIds = (ids: string[]) => CustomerModel.deleteMany({ _id: { $in: ids } });
export const updateCustomerById = (id: string, values: Record<string, any>) => CustomerModel.findByIdAndUpdate(id, values);
export const createCustomers = (values: Record<string, any>[]) => CustomerModel.insertMany(values);

// 配置 Multer 中间件
// const storage = multer.memoryStorage();
// export const upload = multer({ storage });
export const upload = multer({ dest: 'uploads/customers/' });
