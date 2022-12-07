import express from 'express';
import { create, list, one, removeOne } from '../controllers/orders';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../middleware/methodError';
import { orderInput } from '../models/order';

router
	.route('/')
	.get(list)
	.post(validateBody(orderInput), create)
	.all(methodError({ allowed: ['POST', 'GET'] }));

router
	.route('/:_id')
	.get(one)
	.delete(removeOne)
	.all(methodError({ allowed: ['GET', 'DELETE'] }));

export default router;
