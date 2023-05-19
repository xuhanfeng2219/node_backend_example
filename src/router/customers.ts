/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-19 10:21:20
 */
import express from 'express';

import { getAllCustomers, getCustomersByPage, deleteCustomer, deleteCustomers, importCustomers, updateCustomer,displayCustomers, getCustomersByCondition, createdCustomer } from '../controllers/customers';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/customers';

export default(router: express.Router) => {
    router.get('/customers', getAllCustomers);
    router.post('/customers/page', getCustomersByPage);
    router.post('/customers', createdCustomer);
    router.delete('/customers/:id',deleteCustomer);
    router.post('/customers/batchdelete',deleteCustomers);
    router.post("/customers/import",upload.single('csv'), importCustomers);
    router.patch('/customers/:id', updateCustomer);
    router.post('/customers/display', displayCustomers);
    router.patch('/customers/query/:condition', getCustomersByCondition);
};
