import { Document } from 'mongoose';

export interface ISubscriber {
	email: string;
	isActive: boolean;
}

export interface ISubscriberDocument extends ISubscriber, Document {
	createdAt: Date;
	updatedAt: Date;
}
