/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 09:11:07
 */
import mongoose from "mongoose";
import multer from "multer";
import mongoosePaginate from 'mongoose-paginate-v2';

const MatchingSchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true },
    matchingname: { type: String, required: true },
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
    note: { type: String },
    serviceIds: { type: Array<string>, default: [] },
});
// Serviceschema.index({Servicename: 'text', email: 'text', mobile: 'text'});
MatchingSchema.plugin(mongoosePaginate);
const selectFileds = "_id code matchingname category group cost price isDisplay isFavorite createDate updateDate";
export interface MatchingDocument extends mongoose.Document { };
export const MatchingPaginateModel = mongoose.model<MatchingDocument, mongoose.PaginateModel<MatchingDocument>>('Matching', MatchingSchema);
export const MatchingModel = mongoose.model('Matching', MatchingSchema);

export const getMatchings = () => MatchingModel.find();
export const getMatchingsByLimit = (page: number, limit: number) => MatchingPaginateModel.paginate({}, { page, limit, select: selectFileds });
export const getMatchingsCount = () => MatchingModel.count();
export const getMatchingsCountByCondition = (reg: RegExp) => MatchingModel.count({ $or: [{ matchingname: reg }, { code: reg }] });
export const getMatchingByCondition = (reg: RegExp, page: number, limit: number) => MatchingPaginateModel.paginate({ $or: [{ matchingname: reg }, { code: reg }] }, { page, limit, select: selectFileds });
export const getMatchingByCode = (code: string) => MatchingModel.findOne({ code });
export const getMatchingById = (id: string) => MatchingModel.findById({ _id: id });
export const getMatchingsByIds = (ids: Array<string>) => MatchingModel.find({ _id: { $in: ids } });
export const createMatching = (values: Record<string, any>) => new MatchingModel(values).save().then((matching) => matching.toObject());
export const deleteMatchingById = (id: string) => MatchingModel.findOneAndDelete({ _id: id });
export const deleteMatchingsByIds = (ids: string[]) => MatchingModel.deleteMany({ _id: { $in: ids } });
export const updateMatchingById = (id: string, values: Record<string, any>) => MatchingModel.findByIdAndUpdate(id, values);

export const upload = multer({ dest: 'uploads/matchings/' });