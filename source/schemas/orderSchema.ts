import { Schema } from 'mongoose';
import { IOrder } from '../interfaces/order';

const orderSchema = new Schema<IOrder>(
	{
		_id: { type: Number, required: true },
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		customer: {
			name: { type: String, required: true },
			phoneNumber: { type: String, required: [true, 'Phone number is required'] },
			address: { type: String, required: true }
		},
		quantity: { type: Number, required: true },
		amount: { type: Number, required: true },
		status: { type: String, required: true, default: 'Заказ получен' },
		paymentStatus: { type: String, required: true, default: 'не оплачено' }
	},
	{ strictQuery: true, timestamps: true }
);

export default orderSchema;
