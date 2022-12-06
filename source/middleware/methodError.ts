import { NextFunction, Request, Response } from 'express';

const methodError = (methods: { allowed: string[] }) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const allowedMethods = methods.allowed.join(', ').trim();
		res.set('Allow', allowedMethods)
			.status(405)
			.json({ message: `${req.method} method for the ${req.originalUrl} route is not supported.` });
	};
};

export default methodError;
