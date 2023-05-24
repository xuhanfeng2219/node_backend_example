/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 13:06:52
 */
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const PrimeMatchingSchema = new mongoose.Schema({
    // 概览
    customerId: { type: String },
    staffId: { type: String },
    matching: {
        mathingId: { type: String },
        services: [{
            serviceId: { type: String },
            quantity: { type: Number }
        }]
    },
    createDate: { type: Date },
    updateDate: { type: Date },
});

// OrderSchema.index({lastname: 'text', ICNo: 'text', email: 'text', code: 'text'});
PrimeMatchingSchema.plugin(mongoosePaginate);
const selectFileds = "";
export interface PrimeMatchingDocument extends mongoose.Document { };

export const PrimeMatchingModel = mongoose.model('PrimeMatching', PrimeMatchingSchema);
export const PrimeMatchingPaginateModel = mongoose.model<PrimeMatchingDocument, mongoose.PaginateModel<PrimeMatchingDocument>>('PrimeMatching', PrimeMatchingSchema);

export const getPrimeMatchings = () => PrimeMatchingModel.find();
export const getPrimeMatchingsByLimit = (page: number, limit: number) => PrimeMatchingPaginateModel.paginate({}, { page, limit, select: selectFileds });
export const getPrimeMatchingsCount = () => PrimeMatchingModel.count();
export const getPrimeMatchingsCountByCondition = (reg: RegExp) => PrimeMatchingModel.count({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] });
export const queryPrimeMatchingsByCondition = (reg: RegExp, page: number, limit: number) => PrimeMatchingPaginateModel.paginate({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] }, { page, limit, select: selectFileds });
export const getPrimeMatchingByMobile = (mobile: string) => PrimeMatchingModel.findOne({ mobile: mobile });
export const getPrimeMatchingByMatchingId = (matchingId: string) => PrimeMatchingModel.find({ "matching.machingId": matchingId });
export const getPrimeMatchingById = (id: string, fields: string) => PrimeMatchingModel.findById({ _id: id }).select(fields);
export const createPrimeMatching = (values: Record<string, any>) => new PrimeMatchingModel(values).save().then((customer) => customer.toObject());
export const deletePrimeMatchingById = (id: string) => PrimeMatchingModel.findOneAndDelete({ _id: id });
export const deletePrimeMatchingsByIds = (ids: string[]) => PrimeMatchingModel.deleteMany({ _id: { $in: ids } });
export const updatePrimeMatchingById = (id: string, values: Record<string, any>) => PrimeMatchingModel.findByIdAndUpdate(id, values);
export const createPrimeMatchings = (values: Record<string, any>[]) => PrimeMatchingModel.insertMany(values);

// 配置 Multer 中间件
// const storage = multer.memoryStorage();
// export const upload = multer({ storage });
