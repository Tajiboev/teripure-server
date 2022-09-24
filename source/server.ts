import { createServer } from 'http';
import { port, dbUrl } from './config';
import { startBot, stopBot } from './bot';
import mongoose from 'mongoose';
import app from './app';
import log from './utils/logger';

const server = createServer(app);

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		log.info('Connected to mongoDB');
		startServer();
	})
	.catch((error) => {
		log.error('Unable to connect to mongoDB: ', error);
	});

const startServer = async () => {
	server.listen(port, async () => {
		log.info(`Server listening on port ${port}`);
	});
	await startBot();
};

async function shutdown() {
	server.close(() => {
		log.info('HTTP server closed');
	});
	await mongoose.disconnect();
	await mongoose.connection.close();
}

mongoose.connection.on('disconnected', () => {
	log.info('Mongoose disconnected');
});

process.on('SIGTERM', shutdown);
