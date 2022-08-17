import express from 'express';
import { createMessage, listMessages } from '../controllers/messages';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { messageSchema } from '../utils/validationSchemas';

router
	.route('/')
	.post(validateBody(messageSchema), createMessage)
	.get(listMessages)
	.all(methodError({ allowed: ['POST', 'GET'] }));

export default router;
