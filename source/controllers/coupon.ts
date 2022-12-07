import { NextFunction, Request, Response } from 'express';
import Coupon from '../models/coupon';
import ServerError from '../utils/serverError';

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { code, discount } = req.body;

	try {
		const coupon = await Coupon.create({
			code,
			discount
		});
		res.status(201).json(coupon);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const coupons = await Coupon.find().exec();
		res.status(200).json(coupons);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

const one = async (req: Request, res: Response, next: NextFunction) => {
	const { _id } = req.params;
	try {
		const coupon = await Coupon.findOne({ _id }).exec();
		if (!coupon) return next(new ServerError(404, 'Coupon not found.'));

		res.status(200).json(coupon);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

const removeOne = async (req: Request, res: Response, next: NextFunction) => {
	const { _id } = req.params;
	try {
		const { ok } = await Coupon.deleteOne({ _id }).exec();
		if (!ok) return next(new ServerError(400, 'Could not delete the coupon'));

		res.sendStatus(200);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

export { create, list, removeOne, one };
