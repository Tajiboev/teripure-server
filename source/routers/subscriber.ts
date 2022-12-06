import express from 'express';
import { create, list } from '../controllers/subscriber';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../middleware/methodError';
import { subscriberInput } from '../models/subscriber';

router
	.route('/')
	.post(validateBody(subscriberInput), create)
	.get(list)
	.all(methodError({ allowed: ['POST', 'GET'] }));

export default router;
