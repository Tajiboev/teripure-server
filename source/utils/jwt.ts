import { jwtSecrets } from '../config';
import jwt from 'jsonwebtoken';

const signJWT = (id: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		jwt.sign({ uid: id }, jwtSecrets.token_secret, { expiresIn: '1d' }, (err, token) => {
			if (err || !token) reject(new Error('Error signing JWT'));
			if (token) resolve(token);
		});
	});
};

export { signJWT };
