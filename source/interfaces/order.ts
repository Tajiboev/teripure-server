import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
	product: Types.ObjectId;
	promoCode?: Types.ObjectId;
	customer: {
		name: string;
		phoneNumber: string;
		address: string;
	};
	quantity: number;
	amount: number;
	status: 'received' | 'delivered';
	paymentStatus: 'pending' | 'received';
}
