import { NextFunction, Request, Response } from 'express';
import Subscriber from '../models/subscriberModel';

const listSubscribers = (req: Request, res: Response, next: NextFunction) => {
	Subscriber.find()
		.exec()
		.then((result) => {
			res.status(200).json({ data: result });
		})
		.catch(next);
};

const createSubscriber = async (req: Request, res: Response, next: NextFunction) => {
	const { email } = req.body;

	Subscriber.create({ email })
		.then((subscriber) => {
			res.status(201).json(subscriber);
		})
		.catch(next);
};

export { createSubscriber, listSubscribers };
