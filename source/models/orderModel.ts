import { model, Types, Schema, Document } from 'mongoose';

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

export interface IOrderModel extends IOrder, Document {}

const orderSchema: Schema = new Schema(
	{
		orderNumber: { type: Number, required: true, unique: true },
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
		promoCode: { type: Schema.Types.ObjectId, ref: 'PromoCode' },
		quantity: { type: Number, required: true },
		amount: { type: Number, required: true },
		isPaid: { type: Boolean, required: true, default: false },
		merchant_prepare_id: { type: String, default: null }
	},
	{ timestamps: true, versionKey: false }
);

export default model<IOrderModel>('order', orderSchema);
