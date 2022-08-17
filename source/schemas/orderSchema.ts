import { Schema } from 'mongoose';

const orderSchema: Schema = new Schema(
	{
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		name: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		address: { type: String, required: true },
		quantity: { type: Number, required: true },
		orderId: { type: String, required: true }
	},
	{ strictQuery: true, timestamps: true }
);

export default orderSchema;
