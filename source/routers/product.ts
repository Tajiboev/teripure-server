import express from 'express';
import { create, list, one } from '../controllers/product';
const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../middleware/methodError';
import { productInput } from '../models/product';

router
	.route('/')
	.get(list)
	.post(validateBody(productInput), create)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/:_id')
	.get(one)
	.all(methodError({ allowed: ['GET'] }));

export default router;
