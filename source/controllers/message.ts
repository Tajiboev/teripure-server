import { NextFunction, Request, Response } from 'express';
import Message from '../models/message';
import ServerError from '../utils/serverError';

const list = async (req: Request, res: Response, next: NextFunction) => {
	Message.find()
		.exec()
		.then((results) => {
			res.status(200).json(results);
		})
		.catch(next);
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	const { name, phoneNumber, text } = req.body;

	try {
		const message = await Message.create({ name, phoneNumber, text });
		res.status(201).json(message);
	} catch (e) {
		return next(new ServerError(500, 'Server error.'));
	}
};

export { create, list };
