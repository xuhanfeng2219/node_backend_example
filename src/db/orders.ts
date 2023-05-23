/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 19:42:58
 */
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { Customer, Matching, Service } from "../common/common";

const OrderSchema = new mongoose.Schema({
    // 概览
    customer: { type: Customer, default: {} },
    matchings: { type: Array<Matching>, default: [] },
    services: { type: Array<Service>, default: [] },
    paystatus: { type: String },
    customtype: { type: String, default: "" },//消费类型：service,matching,mixed,booking
    createDate: { type: Date },
    updateDate: { type: Date },
});

// OrderSchema.index({lastname: 'text', ICNo: 'text', email: 'text', code: 'text'});
OrderSchema.plugin(mongoosePaginate);
const selectFileds = "";
export interface OrderDocument extends mongoose.Document { }

export const OrderModel = mongoose.model('Order', OrderSchema);
export const OrderPaginateModel = mongoose.model<OrderDocument, mongoose.PaginateModel<OrderDocument>>('Order', OrderSchema);

export const getOrders = () => OrderModel.find();
export const getOrdersByLimit = (page: number, limit: number) => OrderPaginateModel.paginate({}, { page, limit, select: selectFileds });
export const getOrdersCount = () => OrderModel.count();
export const getOrdersCountByCondition = (reg: RegExp) => OrderModel.count({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] });
export const getOrdersByCondition2 = (reg: RegExp, page: number, limit: number) => OrderPaginateModel.paginate({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] }, { page, limit, select: selectFileds });
export const queryOrdersByCondition = (reg: RegExp, page: number, limit: number) => OrderPaginateModel.paginate({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] }, { page, limit, select: selectFileds });
export const getOrderByMobile = (mobile: string) => OrderModel.findOne({ mobile: mobile });
export const getOrderByICNo = (icNo: string) => OrderModel.findOne({ ICNo: icNo });
export const getOrderById = (id: string, fields: string) => OrderModel.findById({ _id: id }).select(fields);
export const createOrder = (values: Record<string, any>) => new OrderModel(values).save().then((customer) => customer.toObject());
export const deleteOrderById = (id: string) => OrderModel.findOneAndDelete({ _id: id });
export const deleteOrdersByIds = (ids: string[]) => OrderModel.deleteMany({ _id: { $in: ids } });
export const updateOrderById = (id: string, values: Record<string, any>) => OrderModel.findByIdAndUpdate(id, values);
export const createOrders = (values: Record<string, any>[]) => OrderModel.insertMany(values);

// 配置 Multer 中间件
// const storage = multer.memoryStorage();
// export const upload = multer({ storage });
