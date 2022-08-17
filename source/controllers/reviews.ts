import { NextFunction, Request, Response } from 'express';
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
	const { author, phoneNumber, text } = req.body;

	Review.create({ author, phoneNumber, text })
		.then((review) => {
			res.status(201).json(review);
		})
		.catch(next);
};

export { createReview, listReviews };
