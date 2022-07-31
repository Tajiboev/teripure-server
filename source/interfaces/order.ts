import { Document } from 'mongoose';

export interface IOrder {
	product: string;
	name: string;
	phoneNumber: string;
	address: string;
	quantity: Number;
	orderId: String;
}

export interface IOrderDocument extends IOrder, Document {
	createdAt: Date;
	updatedAt: Date;
}
