import { NextFunction, Request, Response } from 'express';
import log from '../utils/logger';

const activityLogger = async (req: Request, res: Response, next: NextFunction) => {
	log.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
	res.on('finish', () => {
		log.info(
			`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
		);
	});

	next();
};

export default activityLogger;
