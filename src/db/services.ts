/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 18:36:25
 */
import mongoose from "mongoose";
import multer from "multer";

const ServiceSchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true },
    servicename: { type: String, required: true },
    category: { type: String },
    group: { type: String },
    cost: { type: Number },
    price: { type: Number },
    quantity: { type: Number },
    lowestPrice: { type: Number },
    discount: { type: Number },
    handletime: { type: Number },
    usedays: { type: Number },
    isDonate: { type: String, default: "Yes" },
    isFavorite: { type: String, default: "No" },
    isDisplay: { type: String, default: "Yes" },
    createDate: { type: Date },
    updateDate: { type: Date },
    status: { type: String },
    image: { type: String, default: "" },
    note: { type: String }
});
// Serviceschema.index({Servicename: 'text', email: 'text', mobile: 'text'});

export const ServiceModel = mongoose.model('Service', ServiceSchema);

export const getServices = () => ServiceModel.find();
export const getServicesByLimit = (page: number, limit: number) => ServiceModel.find().skip((page - 1) * limit).limit(limit).exec();
export const getServicesCount = () => ServiceModel.count();
export const getServicesCountByCondition = (reg: RegExp) => ServiceModel.count({ $or: [{ servicename: reg }, { code: reg }] });
export const getServiceByCondition = (reg: RegExp, page: number, limit: number) => ServiceModel.find({ $or: [{ servicename: reg }, { code: reg }] }).skip((page - 1) * limit).limit(limit).exec();
export const getServiceByCode = (code: string) => ServiceModel.findOne({ code });
export const getServiceById = (id: string) => ServiceModel.findById({ _id: id });
export const getServicesByIds = (ids: Array<string>) => ServiceModel.find({ _id: { $in: ids } });
export const createService = (values: Record<string, any>) => new ServiceModel(values).save().then((service) => service.toObject());
export const deleteServiceById = (id: string) => ServiceModel.findOneAndDelete({ _id: id });
export const deleteServicesByIds = (ids: string[]) => ServiceModel.deleteMany({ _id: { $in: ids } });
export const updateServiceById = (id: string, values: Record<string, any>) => ServiceModel.findByIdAndUpdate(id, values);

export const upload = multer({ dest: 'uploads/service/' });