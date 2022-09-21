import { Document, Types } from 'mongoose';

export interface ICustomer extends Document {
	address: string;
	phoneNumber: string;
	name: string;
	orders: [Types.ObjectId];
	confirmationCode?: number;
}
