/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 15:38:06
 */
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const CategorySchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true },
    categoryname: { type: String },
    createDate: { type: Date },
    updateDate: { type: Date },
});
// CategorySchema.index({Categoryname: 'text', email: 'text', mobile: 'text'});
CategorySchema.plugin(mongoosePaginate);
const selectFileds = "";
export interface CategoryDocument extends mongoose.Document { };
export const CategoryPaginateModel = mongoose.model<CategoryDocument, mongoose.PaginateModel<CategoryDocument>>('Category', CategorySchema);
export const CategoryModel = mongoose.model('Category', CategorySchema);


export const getCategorys = () => CategoryModel.find();
export const getCategorysByLimit = (page: number, limit: number) => CategoryPaginateModel.paginate({}, { page, limit, select: selectFileds });
export const getCategorysCount = () => CategoryModel.count();
export const getCategorysCountByCondition = (reg: RegExp) => CategoryModel.count({ $or: [{ categoryname: reg }, { code: reg }] });
export const getCategoryByCondition = (reg: RegExp, page: number, limit: number) => CategoryPaginateModel.paginate({ $or: [{ categoryname: reg }, { code: reg }] }, { page, limit, select: selectFileds });
export const getCategoryByCode = (code: string) => CategoryModel.findOne({ code });
export const getCategoryById = (id: string, fields: string) => CategoryModel.findById({ _id: id }).select(fields);
export const getCategoryByName = (name: string) => CategoryModel.findOne({categoryname: name});
export const createCategory = (values: Record<string, any>) => new CategoryModel(values).save().then((category) => category.toObject());
export const deleteCategoryById = (id: string) => CategoryModel.findOneAndDelete({ _id: id });
export const deleteCategorysByIds = (ids: string[]) => CategoryModel.deleteMany({ _id: { $in: ids } });
export const updateCategoryById = (id: string, values: Record<string, any>) => CategoryModel.findByIdAndUpdate(id, values);
