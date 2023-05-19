/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-19 15:23:45
 */
import express from 'express';

import { getAllServices, deleteService, updateService, getServicesByPage, createdService, favoriteService, deleteServices, displayService, getServicesByCondition } from '../controllers/services';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/services';

export default(router: express.Router) => {
    router.get('/services', getAllServices);
    router.post('/services', createdService);
    router.post('/services/page', getServicesByPage);
    router.delete('/services/:id',deleteService);
    router.post('/services/batchdelete',deleteServices);
    router.patch("/services/:id", updateService);
    router.post('/services/favorite', favoriteService);
    router.post('/services/display', displayService);
    router.patch('/services/query/:condition', getServicesByCondition);
};
