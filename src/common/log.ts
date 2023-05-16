/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-16 20:37:06
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-16 20:39:14
 */
import log4js from 'log4js';

log4js.configure ({ appenders: { console: { type: 'console' } }, categories: { default: { appenders: ['console'], level: 'info' } } });

export const logger = log4js.getLogger();

