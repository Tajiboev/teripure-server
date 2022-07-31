import { createServer } from 'http';
import mongoose from 'mongoose';
import app from './app';
import log from './logger';
import { port } from './config';
import connectDB from './db';

const server = createServer(app);

server.listen(port, async () => {
	log.info(`Server listening on port ${port}`);
	connectDB();
});

async function shutdown() {
	try {
		server.close(() => {
			log.info('HTTP server closed');
		});
		await mongoose.disconnect();
		await mongoose.connection.close();
	} catch (error) {
		log.error(error);
		process.exit(1);
	}
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
