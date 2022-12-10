import { NextFunction, Request, Response } from 'express';
import Order from '../models/order';
import Product from '../models/product';
import Coupon from '../models/coupon';
import ServerError from '../utils/serverError';
import { notify } from '../bot';

const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const orders = await Order.find().populate('product coupon').exec();
		res.status(200).json(orders);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { product, quantity, name, address, phoneNumber, coupon } = req.body;

	// Product check
	try {
		const validProduct = await Product.findOne({ _id: product }).exec();
		if (!validProduct) return new ServerError(404, 'Product not found.');

		const validCoupon = await Coupon.findOne({ code: coupon }).exec();
		const discount = validCoupon?.discount || 0;

		let preliminaryOrder: any = {
			product,
			quantity,
			name,
			phoneNumber,
			address,
			amount: Math.round(quantity * validProduct.price * (1 - discount))
		};

		if (validCoupon) {
			preliminaryOrder['coupon'] = validCoupon._id;
		}

		const order = await Order.create(preliminaryOrder);
		const populatedOrder = await order.populate('product coupon').execPopulate();
		res.status(201).json(populatedOrder);
		notify(populatedOrder);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

const one = async (req: Request, res: Response, next: NextFunction) => {
	const { _id } = req.params;
	try {
		const order = await Order.findOne({ _id }).populate('product coupon').exec();
		if (!order) return next(new ServerError(404, 'Order not found.'));

		res.status(200).json(order);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

const removeOne = async (req: Request, res: Response, next: NextFunction) => {
	const { _id } = req.params;
	try {
		const { ok } = await Order.deleteOne({ _id }).exec();
		if (!ok) return new ServerError(404, `Order with the id ${_id} not found`);

		res.sendStatus(200);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

export { create, list, one, removeOne };
