import { create, list, removeOne } from '../controllers/coupon';
import express from 'express';
const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../middleware/methodError';
import { couponInput } from '../models/coupon';

router
	.route('/')
	.get(list)
	.post(validateBody(couponInput), create)
	.all(methodError({ allowed: ['POST', 'GET'] }));

router
	.route('/:_id')
	.delete(removeOne)
	.all(methodError({ allowed: ['DETELE'] }));

export default router;
