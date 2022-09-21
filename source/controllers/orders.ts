import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { IOrder } from '../interfaces/order';
import Order from '../models/orderModel';
import Product from '../models/productModel';
import Customer from '../models/customerModel';
import PromoCode from '../models/promoCodeModel';
import bot from '../bot';

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
	if (!productData) throw new createHttpError.BadRequest('There is no such product');

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
			let telegramMessage = `Новый заказ!

Имя: ${customer.name}
Номер телефона: ${customer.phoneNumber}
Адрес: ${customer.address}

Номер заказа: ${result.orderNumber}
			`;

			bot.telegram.sendMessage('-1001783472432', telegramMessage);
		})
		.catch(next);
};

const orderInfo = (req: Request, res: Response, next: NextFunction) => {
	const orderId = req.params.orderId;
	Order.findById(orderId)
		.populate('product promoCode customer')
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
