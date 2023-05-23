/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 17:11:52
 */
import express from 'express';

import { getAllCustomers, getCustomersByPage, deleteCustomer, deleteCustomers, importCustomers, updateCustomer, displayCustomers, getCustomersByCondition, createdCustomer, primeCustomers, updateCustomersMatchings, queryCustomerById } from '../controllers/customers';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/customers';

export default (router: express.Router) => {
    router.get('/api/customers', getAllCustomers);
    router.post('/api/customers/page', getCustomersByPage);
    router.post('/api/customers', createdCustomer);
    router.delete('/api/customers/:id', deleteCustomer);
    router.post('/api/customers/batchdelete', deleteCustomers);
    router.post("/api/customers/import", upload.single('csv'), importCustomers);
    router.patch('/api/customers/:id', updateCustomer);
    router.post('/api/customers/display', displayCustomers);
    router.post('/api/customers/prime', primeCustomers);
    router.post('/api/customers/updateCustomerMatching', updateCustomersMatchings);
    router.patch('/api/customers/query/:condition', getCustomersByCondition);
    router.get('/api/customer/:id', queryCustomerById);
};
