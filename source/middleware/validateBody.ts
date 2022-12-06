import { NextFunction, Request, Response } from 'express';
import { Schema } from 'joi';
import ServerError from '../utils/serverError';

const validateBody = (schema: Schema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		schema
			.validateAsync(req.body)
			.then((value) => {
				if (value) next();
			})
			.catch((e) => {
				next(new ServerError(400, e.message));
			});
	};
};

export default validateBody;
