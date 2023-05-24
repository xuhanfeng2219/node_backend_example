/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 13:21:37
 */
import express from 'express';

import { createdMatching, deleteMatching, deleteMatchings, displayMatching, favoriteMatching, getAllMatchings, getMatchingsByCondition, getMatchingsByPage, queryMatchingsByIds, updateMatching } from '../controllers/matchings';

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
