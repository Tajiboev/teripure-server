import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Review from '../models/reviewModel';

const listReviews = (req: Request, res: Response, next: NextFunction) => {
	Review.find()
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch(next);
};

const createReview = async (req: Request, res: Response, next: NextFunction) => {
	const { author, phoneNumber, text, rating } = req.body;

	Review.create({ author, phoneNumber, text, rating })
		.then((review) => {
			res.status(201).json(review);
		})
		.catch(next);
};

const updateReview = async (req: Request, res: Response, next: NextFunction) => {
	const { _id, status } = req.body;

	try {
		let updated = await Review.findByIdAndUpdate(_id, status);
		if (!updated) return next(new createHttpError.NotFound(`Review with the id ${_id} not found`));
		res.status(200).json(updated);
	} catch (error) {
		return next(error);
	}
};

const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
	const { _id } = req.body;

	Review.findByIdAndDelete(_id)
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((e) => {
			return next(new createHttpError.NotFound(`Review with the id ${_id} not found`));
		});
};

export { createReview, listReviews, updateReview, deleteReview };
