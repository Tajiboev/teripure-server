import express from 'express';
import { create, list, updateOne } from '../controllers/review';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../middleware/methodError';
import { reviewInput } from '../models/review';

router
	.route('/')
	.post(validateBody(reviewInput), create)
	.get(list)
	.patch(updateOne)
	.all(methodError({ allowed: ['POST', 'GET'] }));

router
	.route('/:_id')
	.patch(updateOne)
	.all(methodError({ allowed: ['PATCH'] }));

export default router;
