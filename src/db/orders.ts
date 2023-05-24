/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 17:30:54
 */
import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const OrderSchema = new mongoose.Schema({
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
    buyDate: { type: Date },
    usestatus: { type: String },
    incomeSource: { type: String },
    paystatus: { type: String },
    createDate: { type: Date },
    updateDate: { type: Date },
    status: { type: String },
});

OrderSchema.plugin(mongoosePaginate);
const selectFileds = "";
export interface OrderDocument extends mongoose.Document { };

export const OrderModel = mongoose.model('Order', OrderSchema);
export const OrderPaginateModel = mongoose.model<OrderDocument, mongoose.PaginateModel<OrderDocument>>('Order', OrderSchema);

export const getOrders = () => OrderModel.find();
export const getOrdersByLimit = (page: number, limit: number) => OrderPaginateModel.paginate({}, { page, limit, select: selectFileds });
export const getOrdersCount = () => OrderModel.count();
export const getOrdersCountByCondition = (reg: RegExp) => OrderModel.count({ $or: [{ lastname: reg }, { code: reg }, { mobile: reg }, { ICNo: reg }] });
export const getyOrdersByCondition = (customerIds: string[], staffIds: string[], startDate: Date, endDate: Date, page: number, limit: number) => OrderPaginateModel.paginate({
    $and: [{ customerId: { $in: customerIds } }, { staffId: { $in: staffIds } }, {
        createDate: {
            $gte: startDate,
            $lte: endDate,
        }
    }]
}, { page, limit, select: selectFileds, sort: { customerId: -1 } });
export const getOrderByMobile = (mobile: string) => OrderModel.findOne({ mobile: mobile });
export const getOrderByMatchingId = (matchingId: string) => OrderModel.find({ "matching.machingId": matchingId });
export const getOrderById = (id: string, fields: string) => OrderModel.findById({ _id: id }).select(fields);
export const createOrder = (values: Record<string, any>) => new OrderModel(values).save().then((order) => order.toObject());
export const deleteOrderById = (id: string) => OrderModel.findOneAndDelete({ _id: id });
export const deleteOrdersByIds = (ids: string[]) => OrderModel.deleteMany({ _id: { $in: ids } });
export const updateOrderById = (id: string, values: Record<string, any>) => OrderModel.findByIdAndUpdate(id, values);
export const createOrders = (values: Record<string, any>[]) => OrderModel.insertMany(values);

// 配置 Multer 中间件
// const storage = multer.memoryStorage();
// export const upload = multer({ storage });
