import express from 'express';
import { create, list } from '../controllers/message';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../middleware/methodError';
import { messageInput } from '../models/message';

router
	.route('/')
	.get(list)
	.post(validateBody(messageInput), create)
	.all(methodError({ allowed: ['POST', 'GET'] }));

export default router;
