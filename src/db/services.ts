/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-19 11:31:59
 */
import mongoose from "mongoose";
import multer from "multer";
import { convertDateFormat } from "../common/common";

const ServiceSchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true},
    servicename: { type: String, required: true},
    category: { type: String },
    group: { type: String },
    cost: { type: Number},
    price: { type: Number },
    lowestPrice: { type: Number },
    handletime: { type: Number },
    usedays: { type: Number },
    isDonate: { type: String, default: "Yes"},
    isFavorite: { type: String, default: "No" },
    isDisplay: {type: String, default: "Yes"},
    createDate: {type: Date, default: convertDateFormat(new Date())},
    updateDate: {type: Date, default: convertDateFormat(new Date())},
    status: {type: String}
});
// Serviceschema.index({Servicename: 'text', email: 'text', mobile: 'text'});

export const ServiceModel = mongoose.model('Service', ServiceSchema);

export const getServices = () => ServiceModel.find().sort({sort: 1});
export const getServicesCount = () => ServiceModel.count();
export const getServicesCountByCondition = (reg: RegExp) => ServiceModel.count({$or:[{servicename: reg},{code: reg}]});
export const getServiceByCondition = (reg: RegExp) => ServiceModel.find({$or:[{Servicename: reg},{code: reg}]});
export const getServiceByCode = (code: string) => ServiceModel.findOne( {code});
export const getServiceById = (id: string) => ServiceModel.findById({_id: id});
export const createService = (values: Record<string, any>) => new ServiceModel(values).save().then((service) => service.toObject());
export const deleteServiceById = (id: string) => ServiceModel.findOneAndDelete({_id: id});
export const deleteServicesByIds = (ids: string[]) => ServiceModel.deleteMany({_id: {$in: ids}});
export const updateServiceById = (id: string, values: Record<string, any>) => ServiceModel.findByIdAndUpdate(id, values); 

export const upload = multer({dest: 'uploads/service/'});