import { Document } from "mongodb"

/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-16 19:21:43
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-17 20:37:00
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

export interface SortObj {
    id: string
    sort: number
};