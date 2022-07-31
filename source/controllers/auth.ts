import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/userModel';
import { signJWT } from '../utils/jwt';

const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password, firstName, lastName } = req.body;

		const userExists = await User.exists({ email });
		if (userExists) throw new createHttpError.Conflict('User with same email already exists');

		const user = await User.create({ email, password, firstName, lastName });

		const token = await signJWT(user._id);

		res.status(201).json({ user, token });
	} catch (error) {
		next(error);
	}
};

const login = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email }).exec();
		if (!user) throw new createHttpError.Unauthorized('No user');

		const pwdMatch = await user.comparePassword(password);
		if (!pwdMatch) throw new createHttpError.Unauthorized('PWD mismatch');

		const token = await signJWT(user._id);

		res.status(200).json({ user, token });
	} catch (error) {
		next(error);
	}
};

export { signup, login };
