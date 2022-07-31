import mongoose from 'mongoose';
import { dbUrl } from './config';
import log from './logger';

async function connectDB() {
	try {
		await mongoose.connect(dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		log.info('Mongoose connected');
	} catch (error) {
		log.error('Mongoose connection error', error);
		process.exit(1);
	}
}

mongoose.connection.on('disconnected', () => {
	log.info('Mongoose disconnected');
});

export default connectDB;
