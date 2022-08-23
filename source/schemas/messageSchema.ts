import { Schema } from 'mongoose';
import { IMessage } from '../interfaces/message';

const messageSchema = new Schema<IMessage>(
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
