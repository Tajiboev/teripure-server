import { NextFunction, Request, Response } from 'express';
import Message from '../models/messageModel';

const listMessages = (req: Request, res: Response, next: NextFunction) => {
	Message.find()
		.exec()
		.then((results) => {
			res.status(200).json(results);
		})
		.catch(next);
};

const createMessage = async (req: Request, res: Response, next: NextFunction) => {
	const { name, phoneNumber, text } = req.body;

	Message.create({ name, phoneNumber, text })
		.then((message) => {
			res.status(201).json(message);
		})
		.catch(next);
};

export { createMessage, listMessages };
