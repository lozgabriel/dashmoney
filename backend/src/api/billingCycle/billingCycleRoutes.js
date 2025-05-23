import express from 'express';
import { getAll, create, update, remove, getCount, getSummary } from './billingCycleService.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/count', getCount);
router.get('/summary', getSummary);

export default router;