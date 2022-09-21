import { NextFunction, Request, Response } from 'express';
import Customer from '../models/customerModel';

const listCustomers = (req: Request, res: Response, next: NextFunction) => {
	Customer.find()
		.exec()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch(next);
};

export { listCustomers };
