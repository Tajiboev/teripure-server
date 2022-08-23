import { Schema } from 'mongoose';
import { ISubscriber } from '../interfaces/subscriber';

const subscribeSchema = new Schema<ISubscriber>(
	{
		email: {
			type: String,
			required: true
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	{ strictQuery: true, timestamps: true }
);

export default subscribeSchema;
