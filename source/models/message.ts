import { Document, Schema, model } from 'mongoose';
import Joi from 'joi';

export const messageInput = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.string().pattern(new RegExp('^\\+998[0-9]{9}$', 'phone number')).required(),
	text: Joi.string().required()
});

interface IMessage extends Document {
	name: string;
	phoneNumber: string;
	text: string;
}

interface IMessageModel extends IMessage, Document {}

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
	{ timestamps: true, versionKey: false }
);

export default model<IMessageModel>('message', messageSchema);
