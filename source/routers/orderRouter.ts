import express from 'express';
import { createOrder, listOrders, orderInfo } from '../controllers/orders';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { orderSchema } from '../utils/validationSchemas';

router
	.route('/')
	.get(listOrders)
	.post(validateBody(orderSchema), createOrder)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/:orderId')
	.get(orderInfo)
	.all(methodError({ allowed: ['GET'] }));

export default router;
