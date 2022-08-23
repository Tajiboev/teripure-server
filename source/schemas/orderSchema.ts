import { Schema } from 'mongoose';
import { IOrder } from '../interfaces/order';

const orderSchema = new Schema<IOrder>(
	{
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		customer: {
			name: { type: String, required: true },
			phoneNumber: { type: String, required: [true, 'Phone number is required'] },
			address: { type: String, required: true }
		},
		quantity: { type: Number, required: true },
		amount: { type: Number, required: true },
		status: { type: String, required: true, default: 'received' },
		paymentStatus: { type: String, required: true, default: 'pending' }
	},
	{ strictQuery: true, timestamps: true }
);

export default orderSchema;
