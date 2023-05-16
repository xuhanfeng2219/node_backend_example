import { Document } from "mongodb"

/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-16 19:21:43
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 19:49:29
 */
export interface Page {
    page: number
    limit: number
};

export class Result {
    total: number
    page: number
    limit: number
    results: Document[]
};
