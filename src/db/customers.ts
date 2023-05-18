/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-18 14:52:51
 */
import mongoose from "mongoose";
import multer from "multer";

const CustomerSchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true},
    salutation: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    joinDate : { type: Date },
    customerGroup: { type: String},
    membershipNo: { type: String},
    consultant: { type: String},
    ICNo: { type: String },
    gender: { type: String },
    birthday: { type: Date },
    race: { type: String },
    religion: {type: String},
    nationality: { type: String},
    maritalStatus : { type: String },
    occupation: { type: String },
    // contact detail
    mobile: {type: String},
    homeTelephone: {type: String},
    officeTelephone: {type: String},
    otherTelephone: {type: String},
    // address
    fax: {type: String},
    email: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    postCode: {type: String},
    country: {type: String},
    contactPreference: {type: String},
    notes: {type: String},
    notes2: {type: String},
    loyaltyPoint: {type: Number},
    // other
    createDate: {type: Date, default: Date.now()},
    updateDate: {type: Date, default: Date.now()},
    isDisplay: {type: String, default: "Yes"},
});

CustomerSchema.index({lastname: 'text', ICNo: 'text', email: 'text', code: 'text'});

export const CustomerModel = mongoose.model('Customer', CustomerSchema);

export const getCustomers = () => CustomerModel.find();
export const getCustomersCount = () => CustomerModel.count();
export const getCustomersByCode = (code: string) => CustomerModel.find( {$text: {$search: code}});
export const getCustomerByMobile = (mobile: string) => CustomerModel.find({$text: {$search: mobile}});
export const getCustomerByICNo = (icNo: string) => CustomerModel.find({$text: {$search: icNo}});
export const getCustomerById = (id: string) => CustomerModel.findById({_id: id});
export const createCustomer = (values: Record<string, any>) => new CustomerModel(values).save().then((customer) => customer.toObject());
export const deleteCustomerById = (id: string) => CustomerModel.findOneAndDelete({_id: id});
export const deleteCustomersByIds = (ids: string[]) => CustomerModel.deleteMany({_id: {$in: ids}});
export const updateCustomerById = (id: string, values: Record<string, any>) => CustomerModel.findByIdAndUpdate(id, values); 

// 配置 Multer 中间件
const storage = multer.memoryStorage();
export const upload = multer({ storage });
