import { Schema } from 'mongoose';
import { IOrder } from '../interfaces/order';

const orderSchema = new Schema<IOrder>(
	{
		_id: { type: Number, required: true },
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		promoCode: { type: Schema.Types.ObjectId, ref: 'PromoCode' },
		customer: {
			name: { type: String, required: true },
			phoneNumber: { type: String, required: [true, 'Phone number is required'] },
			address: { type: String, required: true }
		},
		quantity: { type: Number, required: true },
		amount: { type: Number, required: true },
		orderStatus: { type: String, required: true, default: 'Заказ оформлен' },
		paymentStatus: { type: String, required: true, default: 'Не оплачено' }
	},
	{ strictQuery: true, timestamps: true }
);

export default orderSchema;
