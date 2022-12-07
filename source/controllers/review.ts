import { NextFunction, Request, Response } from 'express';
import Review from '../models/review';
import ServerError from '../utils/serverError';

const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviews = await Review.find().exec();
		res.status(200).json(reviews);
	} catch (e) {
		return next(new ServerError(500, 'Server error'));
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { name, phoneNumber, text, rating } = req.body;

	try {
		const review = await Review.create({ name, phoneNumber, text, rating });
		res.status(201).json(review);
	} catch (e) {
		return next(new ServerError(500, 'Server error'));
	}
};

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
	const { _id } = req.params;
	const { isPublished } = req.body;

	try {
		let { ok } = await Review.updateOne({ _id }, { isPublished }).exec();
		if (!ok) return next(new ServerError(404, `Review with the id ${_id} not found`));
		res.sendStatus(200);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

export { create, list, updateOne };
