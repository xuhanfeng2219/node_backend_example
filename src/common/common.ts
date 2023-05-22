import { logger } from "./log"
import { getServicesByIds } from "../db/services"
import { getStaffById } from "../db/staffs"
import { getCustomerById } from "../db/customers"
import { getMatchingsByIds } from "../db/matchings"
import { Document } from "mongodb"
/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-16 19:21:43
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 11:10:24
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
    matchingIds: string[]
    isPrime: string
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
        const services = await getServicesByIds(serviceIds) as Array<Service>;
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

export async function getCustomersDocumets(customers: Document[]): Promise<Document[]> {
    const docs = new Array<Document>();
    for (const customer of customers) {
        const matchings = await getMatchingsByIds(customer.matchingIds);
        const matchResults = await matchServices(matchings as unknown as Array<Matching>);
        const doc: Document = {
            '_id': customer._id,
            'code': customer.code,
            'salutation': customer.salutation,
            'firstname': customer.firstname,
            'lastname': customer.lastname,
            'joinDate': customer.joinDate,
            'customerGroup': customer.customerGroup,
            'membershipNo': customer.membershipNo,
            'consultant': customer.consultant,
            'ICNo': customer.ICNo,
            'gender': customer.gender,
            'birthday': customer.birthday,
            'race': customer.race,
            'religion': customer.religion,
            'nationality': customer.nationality,
            'maritalStatus': customer.maritalStatus,
            'occupation': customer.occupation,
            'mobile': customer.mobile,
            'homeTelephone': customer.homeTelephone,
            'officeTelephone': customer.officeTelephone,
            'otherTelephone': customer.otherTelephone,
            'fax': customer.fax,
            'email': customer.email,
            'address': customer.address,
            'city': customer.city,
            'state': customer.state,
            'postCode': customer.postCode,
            'country': customer.country,
            'contactPreference': customer.contactPreference,
            'notes': customer.notes,
            'notes2': customer.notes2,
            'loyaltyPoint': customer.loyaltyPoint,
            'createDate': customer.createDate,
            'updateDate': customer.updateDate,
            'isDisplay': customer.isDisplay,
            'isPrime': customer.isPrime,
            'paystatus': customer.paystatus,
            'balance': customer.balance,
            'matchingIds': customer.matchingIds,
            'matchings': matchResults,
        };
        docs.push(doc);
    }
    return docs;
}

export async function getBookingDocuments(bookings: Document[]): Promise<Document[]> {
    const docs = new Array<Document>();
    for (const book of bookings) {
        const staff = await getStaffById(book.staffIds[0]);
        const customer = await getCustomerById(book.customerIds[0]);
        const services = await getServicesByIds(book.serviceIds);
        const matchings = await getMatchingsByIds(book.matchingIds);
        const doc: Document = {
            '_id': book._id,
            'code': book.code,
            'price': book.price,
            'quantity': book.quantity,
            'lowestPrice': book.lowestPrice,
            'discount': book.discount,
            'handletime': book.handletime,
            'startTime': book.startTime,
            'endTime': book.endTime,
            'createDate': book.createDate,
            'updateDate': book.updateDate,
            'paystatus': book.paystatus,
            'status': book.status,
            'notes': book.notes,
            'notes2': book.notes2,
            'customer': customer,
            'staff': staff,
            'services': services,
            'matchings': matchings,
        };
        docs.push(doc);
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

export function convertNextDayFormat(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() + 1;
    return new Date(Date.UTC(year, month, day));
}