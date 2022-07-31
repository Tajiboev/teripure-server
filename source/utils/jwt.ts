import { secret_token } from '../config';
import jwt from 'jsonwebtoken';

const signJWT = (id: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign({ userId: id }, secret_token, { expiresIn: '1d' }, (err, token) => {
			if (err || !token) reject(new Error('Error signing JWT'));
			if (token) resolve(token);
		});
	});
};

export { signJWT };
