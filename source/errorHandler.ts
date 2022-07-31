import createHttpError, { HttpError } from 'http-errors';
import { NextFunction, Request, Response } from 'express';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
	next(createHttpError(404));
};

const errorHandler = async (error: HttpError, req: Request, res: Response, next: NextFunction) => {
	console.error('👉', error, '\n');
	res.status(error.statusCode || 500).json({
		error: {
			statusCode: error.statusCode,
			message: error.message
		}
	});
};

export { notFound, errorHandler };
