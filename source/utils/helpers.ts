import crypto from 'crypto';
import { secret_key, merchant_user_id } from '../config';

const createAuthHeader = () => {
	const timestamp = Math.floor(+new Date() / 1000);
	const data = timestamp + secret_key;
	const digest = crypto.createHash('sha1').update(data, 'binary').digest('hex');
	const header = `Auth: ${merchant_user_id}:${digest}:${timestamp}`;

	return header;
};

export { createAuthHeader };
