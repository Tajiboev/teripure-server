import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { IOrder } from '../interfaces/order';
import Order from '../models/orderModel';
import Product from '../models/productModel';

const listOrders = (req: Request, res: Response, next: NextFunction) => {
	Order.find()
		.populate('product')
		.exec()
		.then((result) => {
			res.status(200).json({ data: result });
		})
		.catch(next);
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
	const body = req.body as IOrder;
	const { customer, product, quantity } = body;
	const _id = Math.floor(100000 + Math.random() * 900000);

	const productData = await Product.findById({ _id: product });
	if (!productData) throw new createHttpError.BadRequest('There is no such product');

	Order.create({ _id, customer, product, quantity, amount: quantity * productData.price })
		.then((order) => {
			res.status(201).json(order);
		})
		.catch(next);
};

const orderInfo = (req: Request, res: Response, next: NextFunction) => {
	const orderId = req.params.orderId;
	Order.findById(orderId)
		.populate('product')
		.then((order) => {
			if (order) {
				res.status(200).json(order);
			} else {
				res.status(404).json({ message: 'No order found for provided ID' });
			}
		})
		.catch(next);
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
	const orderId = req.params.orderId;
	Order.findByIdAndRemove(orderId)
		.exec()
		.then((result) => {
			if (!result) throw new createHttpError.NotFound(`Order with the id ${orderId} not found`);
			res.status(200).json(result);
		})
		.catch(next);
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updates = req.body;
		const { orderId } = req.params;

		const order = await Order.findById(orderId).exec();
		if (!order) throw new createHttpError.NotFound(`order with the id ${orderId} not found`);

		Object.assign(order, updates);
		const updatedOrder = await order.save();

		res.status(200).json(updatedOrder);
	} catch (e) {
		next(e);
	}
};

export { createOrder, listOrders, orderInfo, deleteOrder, updateOrder };
