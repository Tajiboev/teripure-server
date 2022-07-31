import { Schema } from 'mongoose';

const subscribeSchema: Schema = new Schema(
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
