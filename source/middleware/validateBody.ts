import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Schema } from 'joi';

const validateBody = (schema: Schema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		schema
			.validateAsync(req.body)
			.then((value) => {
				if (value) next();
			})
			.catch((e) => {
				next(createHttpError(400, e.message));
			});
	};
};

export default validateBody;
