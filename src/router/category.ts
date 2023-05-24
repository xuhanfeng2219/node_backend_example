/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 15:15:45
 */
import express from 'express';

import { createdCategory, deleteCategory, deleteCategorys, getCategorysByPage, updateCategory } from '../controllers/category';

export default (router: express.Router) => {
    router.post('/api/category', createdCategory);
    router.post('/api/category/page', getCategorysByPage);
    router.delete('/api/category/:id', deleteCategory);
    router.post('/api/category/batchdelete', deleteCategorys);
    router.patch("/api/category/:id", updateCategory);
};
