import express from 'express';
import { createProduct, listProducts, productInfo } from '../controllers/products';
const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { productSchema } from '../utils/validationSchemas';

router
	.route('/')
	.get(listProducts)
	.post(validateBody(productSchema), createProduct)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/:slug')
	.get(productInfo)
	.all(methodError({ allowed: ['GET'] }));

export default router;
