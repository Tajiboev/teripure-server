import { Document, Types } from 'mongoose';

export interface IOrder extends Document {
	orderNumber: Number;
	product: Types.ObjectId;
	customer: Types.ObjectId;
	promoCode?: Types.ObjectId;
	quantity: number;
	amount: number;
	isPaid: boolean;
	merchant_prepare_id?: number;
}
