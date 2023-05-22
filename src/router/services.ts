/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-22 21:54:26
 */
import express from 'express';

import { getAllServices, deleteService, updateService, getServicesByPage, createdService, favoriteService, deleteServices, displayService, getServicesByCondition, queryServicesByIds } from '../controllers/services';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/services';

export default(router: express.Router) => {
    router.get('/api/services', getAllServices);
    router.post('/api/services', createdService);
    router.post('/api/services/page', getServicesByPage);
    router.delete('/api/services/:id',deleteService);
    router.post('/api/services/batchdelete',deleteServices);
    router.post('/api/services/queryServicesByIds',queryServicesByIds);
    router.patch("/api/services/:id", updateService);
    router.post('/api/services/favorite', favoriteService);
    router.post('/api/services/display', displayService);
    router.patch('/api/services/query/:condition', getServicesByCondition);
};
