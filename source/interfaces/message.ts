import { Document } from 'mongoose';

export interface IMessage {
	name: string;
	phoneNumber: string;
	text: string;
}

export interface IMessageDocument extends IMessage, Document {
	createdAt: Date;
	updatedAt: Date;
}
