import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Order from '../models/orderModel';
import Product from '../models/productModel';
import Customer from '../models/customerModel';
import PromoCode from '../models/promoCodeModel';
import { sendOrderInfo } from '../bot';

const listOrders = (req: Request, res: Response, next: NextFunction) => {
	Order.find()
		.populate('product promoCode')
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch(next);
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
	const { customer, product, quantity, promoCode } = req.body;

	const productData = await Product.findById(product);
	if (!productData) return next(createHttpError(400));

	let user = await Customer.findOne({ phoneNumber: customer.phoneNumber }).exec();
	if (!user) {
		user = await Customer.create(customer);
	} else {
		user.address = customer.address;
		user.name = customer.name;
		await user.save();
	}

	const orderNumber = Math.floor(100000 + Math.random() * 900000);

	let order = new Order({
		product,
		orderNumber,
		amount: productData.price * quantity,
		customer: user._id,
		quantity
	});

	user.orders.push(order._id);
	await user.save();

	if (promoCode) {
		const promoCodeData = await PromoCode.findOne({ code: promoCode });
		if (promoCodeData) {
			order.amount = order.amount * (1 - promoCodeData.discount);
			order.promoCode = promoCodeData._id;
		}
	} else {
		delete order.promoCode;
	}

	order
		.save()
		.then((result) => {
			res.status(201).json(result);
			sendOrderInfo(customer.name, customer.phoneNumber, customer.address, orderNumber);
		})
		.catch(next);
};

const orderInfo = (req: Request, res: Response, next: NextFunction) => {
	const orderId = req.params.orderId;
	Order.findOne({ _id: orderId })
		.populate('product promoCode customer')
		.exec()
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
	Order.findOneAndDelete({ _id: orderId })
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

		const order = await Order.findOne({ _id: orderId }).exec();
		if (!order) throw new createHttpError.NotFound(`order with the id ${orderId} not found`);

		Object.assign(order, updates);
		const updatedOrder = await order.save();

		res.status(200).json(updatedOrder);
	} catch (e) {
		next(e);
	}
};

export { createOrder, listOrders, orderInfo, deleteOrder, updateOrder };
