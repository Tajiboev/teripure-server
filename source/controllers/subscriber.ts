import { NextFunction, Request, Response } from 'express';
import Subscriber from '../models/subscriber';
import ServerError from '../utils/serverError';

const list = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const subscribers = await Subscriber.find().exec();
		res.status(200).json(subscribers);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;

	try {
		const subscriber = await Subscriber.create({ email });
		res.status(201).json(subscriber);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

export { create, list };
