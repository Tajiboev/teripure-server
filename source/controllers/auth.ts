import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import User from '../models/userModel';
import { signJWT } from '../utils/jwt';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password, firstName, lastName } = req.body;

	try {
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		const user = await User.create({ email, password: hash, firstName, lastName });
		if (!user) throw new createHttpError.InternalServerError('Could not create user');

		const token = await signJWT(user._id);

		res.status(200).json({ user, token });
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
		if (!pwdMatch) throw new createHttpError.Unauthorized();

		const token = await signJWT(user._id);
		const userInfo = {
			name: user.firstName + ' ' + user.lastName,
			email: user.email
		};
		res.status(200).json({ user: userInfo, token });
	} catch (error) {
		next(error);
	}
};

export { login, createUser };
