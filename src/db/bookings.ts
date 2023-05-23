/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 14:25:42
 */
import mongoose from "mongoose";
import multer from "multer";
import { convertDateFormat } from "../common/common";
import mongoosePaginate from 'mongoose-paginate-v2';

const BookingSchema = new mongoose.Schema({
    // 概览
    code: { type: String, required: true },
    price: { type: Number },
    quantity: { type: Number },
    lowestPrice: { type: Number },
    discount: { type: Number },
    handletime: { type: Number },
    startTime: { type: Date },
    endTime: { type: Date },
    createDate: { type: Date, default: convertDateFormat(new Date()) },
    updateDate: { type: Date, default: convertDateFormat(new Date()) },
    paystatus: { type: String, default: "Unpaid" },
    status: { type: String, default: "reserve" },//预约reserve、确定sure、签入checkin、临时取消cancel、未出席absent
    notes: { type: String },
    notes2: { type: String },
    customerId: { type: String },
    staffId: { type: String },
    serviceIds: { type: Array<String>, default: [] },
    matchingIds: { type: Array<String>, default: [] },
});
// Serviceschema.index({Servicename: 'text', email: 'text', mobile: 'text'});
BookingSchema.plugin(mongoosePaginate);
export interface BookingDocument extends mongoose.Document { };
export const BookingPaginateModel = mongoose.model<BookingDocument, mongoose.PaginateModel<BookingDocument>>('Booking', BookingSchema);
export const BookingModel = mongoose.model('Booking', BookingSchema);

export const getBookings = () => BookingModel.find();
export const getBookingsByLimt = (page: number, limit: number) => BookingPaginateModel.paginate({}, { page, limit });
export const getBookingsByDate = (startDate: Date, endDate: Date) => BookingModel.find({
    updateDate: {
        $gte: startDate,
        $lte: endDate,
    }
});
export const getBookingsCount = () => BookingModel.count();
export const getBookingsCountByCondition = (reg: RegExp) => BookingModel.count({ $or: [{ code: reg }] });
export const getBookingByCondition = (reg: RegExp, page: number, limit: number) => BookingPaginateModel.paginate({ $or: [{ code: reg }] }, { page, limit });
export const getBookingByCode = (code: string) => BookingModel.findOne({ code });
export const getBookingById = (id: string) => BookingModel.findById({ _id: id });
export const getBookingByCustomerIds = (customerIds: string[]) => BookingModel.find({ customerIds: customerIds });
export const createBooking = (values: Record<string, any>) => new BookingModel(values).save().then((booking) => booking.toObject());
export const deleteBookingById = (id: string) => BookingModel.findOneAndDelete({ _id: id });
export const deleteBookingsByIds = (ids: string[]) => BookingModel.deleteMany({ _id: { $in: ids } });
export const updateBookingById = (id: string, values: Record<string, any>) => BookingModel.findByIdAndUpdate(id, values);

export const upload = multer({ dest: 'uploads/bookings/' });