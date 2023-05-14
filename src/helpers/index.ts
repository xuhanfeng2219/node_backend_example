/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 20:09:12
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-14 20:14:47
 */
import crypto from 'crypto';

const SECRET = "XUHANFENG-REST-API";

export const random = crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('base64');
};