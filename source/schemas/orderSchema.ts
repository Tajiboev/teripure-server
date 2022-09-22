import { Schema } from 'mongoose';
import { IOrder } from '../interfaces/order';

const orderSchema = new Schema<IOrder>(
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
	{ strictQuery: true, timestamps: true }
);

export default orderSchema;
