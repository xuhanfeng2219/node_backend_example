import { Document } from "mongodb"
import { logger } from "./log"

/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-16 19:21:43
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-18 21:43:10
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
};

export class Customer {
    code:string
    salutation:string
    firstname:string
    lastname:string
    joinDate :Date
    customerGroup:string
    membershipNo:string
    consultant:string
    ICNo:string
    gender:string
    birthday:Date
    race:string
    religion: string
    nationality:string
    maritalStatus :string
    occupation:string
    mobile: string
    homeTelephone:string
    officeTelephone:string
    otherTelephone:string
    fax:string
    email:string
    address:string
    city:string
    state:string
    postCode:string
    country:string
    contactPreference:string
    notes:string
    notes2:string
    loyaltyPoint:number
    createdate:Date
    updatedate:Date
    isDisplay:string
}

export function parseDate(str: string): Date {
    let s = str.replace('//', '/');
    s = s.replace('.','/');
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