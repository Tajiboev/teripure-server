import { Document, Schema, model } from 'mongoose';

export interface IMessage extends Document {
	name: string;
	phoneNumber: string;
	text: string;
}

export interface IMessageModel extends IMessage, Document {}

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
