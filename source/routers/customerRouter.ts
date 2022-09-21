import express from 'express';
import { listCustomers } from '../controllers/customer';

const router = express.Router();

import methodError from '../utils/methodError';

router
	.route('/')
	.get(listCustomers)
	.all(methodError({ allowed: ['GET'] }));

export default router;
