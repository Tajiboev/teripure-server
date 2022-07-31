import { Schema, HookNextFunction } from 'mongoose';
import { IOrderDocument } from '../interfaces/order';

const orderSchema: Schema = new Schema(
	{
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		name: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		address: { type: String, required: true },
		quantity: { type: Number, required: true, default: 1 },
		orderId: { type: String, required: true }
	},
	{ strictQuery: true, timestamps: true }
);

export default orderSchema;
