import { Document } from 'mongoose';

export interface IMessage extends Document {
	name: string;
	phoneNumber: string;
	text: string;
}
