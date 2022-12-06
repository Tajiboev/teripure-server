import { createServer } from 'http';
import { port, dbUrl } from './config';
import { startBot, stopBot } from './bot';
import mongoose from 'mongoose';
import app from './app';

const server = createServer(app);

mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.info('Connected to mongoDB');
		startServer();
	})
	.catch((error) => {
		console.error('Unable to connect to mongoDB: ', error);
	});

const startServer = async () => {
	server.listen(port, async () => {
		console.info(`Server listening on port ${port}`);
	});
	await startBot();
};

async function shutdown() {
	server.close(() => {
		console.info('HTTP server closed');
	});
	await mongoose.disconnect();
	await mongoose.connection.close();
}

mongoose.connection.on('disconnected', () => {
	console.info('Mongoose disconnected');
});

process.on('SIGTERM', shutdown);
