/*
 * @Description: 
 * @Version: 1.0
 * @Autor: xuhanfeng
 * @Date: 2023-05-14 21:00:57
 * @LastEditors: xuhanfeng
 * @LastEditTime: 2023-05-24 13:23:59
 */
import express from 'express';

import { createdPrimeMatching, deletePrimeMatching, deletePrimeMatchings, getPrimeMatchingsByPage, updatePrimeMatching } from '../controllers/prime_match';

export default (router: express.Router) => {
    router.post('/api/prime_match', createdPrimeMatching);
    router.post('/api/prime_match/page', getPrimeMatchingsByPage);
    router.delete('/api/prime_match/:id', deletePrimeMatching);
    router.post('/api/prime_match/batchdelete', deletePrimeMatchings);
    router.patch("/api/prime_match/:id", updatePrimeMatching);
};
