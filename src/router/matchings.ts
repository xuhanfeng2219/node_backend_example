/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-23 16:04:48
 */
import express from 'express';

import { getAllMatchings, deleteMatching, updateMatching, getMatchingsByPage, createdMatching, favoriteMatching, deleteMatchings, displayMatching, getMatchingsByCondition, queryMatchingsByIds } from '../controllers/matchings';
import { isAuthenticated, isOwner } from '../middlewares';
import { upload } from '../db/matchings';

export default (router: express.Router) => {
    router.get('/api/matchings', getAllMatchings);
    router.post('/api/matchings', createdMatching);
    router.post('/api/matchings/page', getMatchingsByPage);
    router.delete('/api/matchings/:id', deleteMatching);
    router.post('/api/matchings/batchdelete', deleteMatchings);
    router.patch("/api/matchings/:id", updateMatching);
    router.post('/api/matchings/favorite', favoriteMatching);
    router.post('/api/matchings/display', displayMatching);
    router.post('/api/queryMatchingsByIds', queryMatchingsByIds);
    router.patch('/api/matchings/query/:condition', getMatchingsByCondition);
};
