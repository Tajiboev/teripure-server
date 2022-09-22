import express from 'express';
import { createOrder, listOrders, orderInfo, updateOrder, deleteOrder } from '../controllers/orders';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { orderSchema } from '../utils/validationSchemas';

router
	.route('/')
	.get(listOrders)
	.post(validateBody(orderSchema), createOrder)
	.all(methodError({ allowed: ['POST', 'GET'] }));

router
	.route('/:orderId')
	.get(orderInfo)
	.patch(updateOrder)
	.delete(deleteOrder)
	.all(methodError({ allowed: ['GET', 'PATCH', 'DELETE'] }));

export default router;
