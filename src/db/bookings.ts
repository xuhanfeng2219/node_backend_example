/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 19:51:25
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-21 17:40:26
 */
import mongoose from "mongoose";
import multer from "multer";
import { convertDateFormat } from "../common/common";

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
    customerIds: { type: Array<String>, default: [] },
    staffIds: { type: Array<String>, default: [] },
    serviceIds: { type: Array<String>, default: [] },
    matchingIds: { type: Array<String>, default: [] },
});
// Serviceschema.index({Servicename: 'text', email: 'text', mobile: 'text'});

export const BookingModel = mongoose.model('Booking', BookingSchema);

export const getBookings = () => BookingModel.find();
export const getBookingsByDate = (date: Date) => BookingModel.find({updateDate: date});
export const getBookingsCount = () => BookingModel.count();
export const getBookingsCountByCondition = (reg: RegExp) => BookingModel.count({ $or: [{ code: reg }] });
export const getBookingByCondition = (reg: RegExp) => BookingModel.find({ $or: [{ code: reg }] });
export const getBookingByCode = (code: string) => BookingModel.findOne({ code });
export const getBookingById = (id: string) => BookingModel.findById({ _id: id });
export const createBooking = (values: Record<string, any>) => new BookingModel(values).save().then((booking) => booking.toObject());
export const deleteBookingById = (id: string) => BookingModel.findOneAndDelete({ _id: id });
export const deleteBookingsByIds = (ids: string[]) => BookingModel.deleteMany({ _id: { $in: ids } });
export const updateBookingById = (id: string, values: Record<string, any>) => BookingModel.findByIdAndUpdate(id, values);

export const upload = multer({ dest: 'uploads/bookings/' });