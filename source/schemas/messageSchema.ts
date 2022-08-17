import { Schema } from 'mongoose';

const messageSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		phoneNumber: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	},
	{ strictQuery: true, timestamps: true }
);

export default messageSchema;
