import { NextFunction, Request, Response } from 'express';
import Product from '../models/product';
import ServerError from '../utils/serverError';

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { name, description, price } = req.body;

	try {
		const product = await Product.create({
			name,
			description,
			price
		});
		res.status(201).json(product);
	} catch (e) {
		return next(new ServerError(500, 'Server error'));
	}
};

const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const products = await Product.find().exec();
		res.status(200).json(products);
	} catch (e) {
		return next(new ServerError(500, 'Server error'));
	}
};

const one = async (req: Request, res: Response, next: NextFunction) => {
	const { _id } = req.params;
	try {
		const product = await Product.findOne({ _id }).exec();
		if (!product) return next(new ServerError(404, 'Product not found'));

		res.status(200).json(product);
	} catch (e) {
		return next(new ServerError(500, 'Server error'));
	}
};

export { create, list, one };
