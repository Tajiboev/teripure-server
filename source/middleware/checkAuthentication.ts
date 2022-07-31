import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { jwtSecrets } from '../config';

const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;

	if (!authorization) {
		console.error('No auth header or header does not start with Bearer');
		return next(createHttpError(401, 'Unathorized'));
	}

	const split = authorization.split(' ');
	if (split.length !== 2 || split[0] !== 'Bearer' || !split[1]) {
		console.error('Auth header exists but incorrect token');
		return next(createHttpError(401, 'Unathorized'));
	}

	const token = split[1];

	jwt.verify(token, jwtSecrets.token_secret, (err, decoded) => {
		if (err) {
			console.error('jwt error', err);
			return next(createHttpError(401, 'Unathorized'));
		} else if (decoded) {
			res.locals = { ...res.locals, authorized: true, ...decoded };
			next();
		} else {
			next(createHttpError(401, 'Unathorized'));
		}
	});
};

export default checkAuthentication;
