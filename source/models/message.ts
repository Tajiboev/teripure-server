import { Document, Schema, model } from 'mongoose';
import Joi from 'joi';

export const messageInput = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	text: Joi.string().required()
});

interface IMessage extends Document {
	name: string;
	email: string;
	text: string;
}

interface IMessageModel extends IMessage, Document {}

const messageSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	},
	{ timestamps: true, versionKey: false }
);

export default model<IMessageModel>('message', messageSchema);
