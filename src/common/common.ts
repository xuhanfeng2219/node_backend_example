import { logger } from "./log"
import { getServiceByIds } from "../db/services"
import { getStaffById } from "../db/staffs"
import { getCustomerById } from "../db/customers"
import {getMatchingsByIds} from "../db/matchings"
import { Document } from "mongodb"
/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-16 19:21:43
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-21 18:57:01
 */
export interface Page {
    page: number
    limit: number
};

export class PageResult {
    code: number
    msg: string
    total: number
    page: number
    limit: number
    result: Document
};

export class Result {
    code: number
    msg: string
    result: Document
}

export interface Condition {
    id: string
    sort: number
    isDisplay: string
    isFavorite: string
};

export class Customer {
    code: string
    salutation: string
    firstname: string
    lastname: string
    joinDate: Date
    customerGroup: string
    membershipNo: string
    consultant: string
    ICNo: string
    gender: string
    birthday: Date
    race: string
    religion: string
    nationality: string
    maritalStatus: string
    occupation: string
    mobile: string
    homeTelephone: string
    officeTelephone: string
    otherTelephone: string
    fax: string
    email: string
    address: string
    city: string
    state: string
    postCode: string
    country: string
    contactPreference: string
    notes: string
    notes2: string
    loyaltyPoint: number
    createdate: Date
    updatedate: Date
    isDisplay: string
}

export class Service {
    code: string
    servicename: string
    category: string
    group: string
    cost: number
    price: number
    quantity: number
    lowestPrice: number
    discount: number
    handletime: number
    usedays: number
    isDonate: string
    isFavorite: string
    isDisplay: string
    createDate: Date
    updateDate: Date
    status: string
    image: string
    note: string
}

export class Matching {
    _id: string
    code: string
    matchingname: string
    category: string
    group: string
    cost: number
    price: number
    quantity: number
    lowestPrice: number
    discount: number
    handletime: number
    usedays: number
    isDonate: string
    isFavorite: string
    isDisplay: string
    createDate: Date
    updateDate: Date
    status: string
    image: string
    note: string
    serviceIds: Array<string>
    services: Array<Service>
}

export async function matchServices(matchings: Array<Matching>): Promise<Array<Matching>> {
    const mathes = new Array<Matching>;
    for (const match of matchings) {
        const mth = new Matching();
        const serviceIds = match.serviceIds;
        const services = await getServiceByIds(serviceIds) as Array<Service>;
        mth._id = match._id;
        mth.code = match.code;
        mth.matchingname = match.matchingname;
        mth.category = match.category;
        mth.group = match.group;
        mth.cost = match.cost;
        mth.price = match.price;
        mth.quantity = match.quantity;
        mth.lowestPrice = match.lowestPrice;
        mth.discount = match.discount;
        mth.handletime = match.handletime;
        mth.usedays = match.usedays;
        mth.isDonate = match.isDonate;
        mth.isFavorite = match.isFavorite;
        mth.isDisplay = match.isDisplay;
        mth.createDate = match.createDate;
        mth.updateDate = match.updateDate;
        mth.status = match.status;
        mth.image = match.image;
        mth.note = match.note;
        mth.services = services;
        mathes.push(mth);
    }
    return mathes;
}

export async function getBookingDocuments(bookings: Document[]): Promise<Document[]> {
    const docs = new Array<Document>();
    for (const book of bookings) {
        const doc = new Document();
        doc.createElement('_id', book._id);
        doc.createElement('code', book.code);
        doc.createElement('price', book.price);
        doc.createElement('quantity', book.quantity);
        doc.createElement('lowestPrice', book.lowestPrice);
        doc.createElement('discount', book.discount);
        doc.createElement('handletime', book.handletime);
        doc.createElement('startTime', book.startTime);
        doc.createElement('endTime', book.endTime);
        doc.createElement('createDate', book.createDate);
        doc.createElement('updateDate', book.updateDate);
        doc.createElement('paystatus', book.paystatus);
        doc.createElement('status', book.status);
        doc.createElement('notes', book.notes);
        doc.createElement('notes2', book.notes2);
        const staff = await getStaffById(book.staffIds[0]);
        const customer = await getCustomerById(book.customerIds[0]);
        const services = await getServiceByIds(book.servicesIds);
        const matchings = await getMatchingsByIds(book.matchingIds);
        doc.createElement('customer', customer as Document);
        doc.createElement('staff', staff as Document);
        doc.createElement('services', services as Document);
        doc.createElement('matchings', matchings as Document);
    }
    return docs;
}

export function parseDate(str: string): Date {
    let s = str.replace('//', '/');
    s = s.replace('.', '/');
    const parts = s.split('/');
    let year = parseInt(parts[2]);
    if (year > 2023) {
        year = 2023;
        // logger.info(`year`, s);
    }
    let month = parseInt(parts[1]) - 1;
    if (month > 11) {
        // logger.info(`month`, s);
        month = 11;
    }
    const day = parseInt(parts[0]);
    if (day > 31) {
        logger.info(`day`, s);
    }
    const res = new Date(Date.UTC(year, month, day));
    // logger.info(`result`, res);
    return res;
}

export function convertDateFormat(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return new Date(Date.UTC(year, month, day, hour, minutes, seconds));
}