/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-19 16:31:32
 */
import express from 'express';

import { getAllMatchings, deleteMatching, updateMatching, getMatchingsByPage, createdMatching, favoriteMatching, deleteMatchings, displayMatching, getMatchingsByCondition } from '../controllers/matchings';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/matchings';

export default(router: express.Router) => {
    router.get('/matchings', getAllMatchings);
    router.post('/matchings', createdMatching);
    router.post('/matchings/page', getMatchingsByPage);
    router.delete('/matchings/:id',deleteMatching);
    router.post('/matchings/batchdelete',deleteMatchings);
    router.patch("/matchings/:id", updateMatching);
    router.post('/matchings/favorite', favoriteMatching);
    router.post('/matchings/display', displayMatching);
    router.patch('/matchings/query/:condition', getMatchingsByCondition);
};
