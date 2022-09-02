import express from 'express';
import { createPromoCode, listPromoCodes, deletePromoCode } from '../controllers/promoCodes';
const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { promoCodeSchema } from '../utils/validationSchemas';

router
	.route('/')
	.get(listPromoCodes)
	.post(validateBody(promoCodeSchema), createPromoCode)
	.all(methodError({ allowed: ['POST', 'GET'] }));

router
	.route('/:id')
	.delete(deletePromoCode)
	.all(methodError({ allowed: ['DETELE'] }));

export default router;
