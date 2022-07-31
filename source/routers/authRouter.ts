import express from 'express';
import { login, createUser } from '../controllers/auth';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { loginSchema, signupSchema } from '../utils/validationSchemas';

router
	.route('/signup')
	.post(validateBody(signupSchema), createUser)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/login')
	.post(validateBody(loginSchema), login)
	.all(methodError({ allowed: ['POST'] }));

export default router;
