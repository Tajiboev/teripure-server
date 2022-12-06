import { NextFunction, Request, Response } from 'express';
import ServerError from '../utils/serverError';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
	next(new ServerError(404, 'Route not found.'));
};

const errorHandler = async (error: ServerError, req: Request, res: Response, next: NextFunction) => {
	res.status(error.statusCode || 500).json({
		error: {
			message: error.message
		}
	});
};

export { notFound, errorHandler };
