import express from 'express';
import { createSubscriber, listSubscribers } from '../controllers/subscribe';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { subscribeSchema } from '../utils/validationSchemas';

router
	.route('/')
	.post(validateBody(subscribeSchema), createSubscriber)
	.get(listSubscribers)
	.all(methodError({ allowed: ['POST', 'GET'] }));

export default router;
