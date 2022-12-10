import Joi from 'joi';
import { model, Types, Schema, Document } from 'mongoose';

export const orderInput = Joi.object({
	product: Joi.string().required(),
	quantity: Joi.number().integer().min(1).required(),
	name: Joi.string().required(),
	phoneNumber: Joi.string().pattern(new RegExp('^\\+998[0-9]{9}$')).required(),
	address: Joi.string().required(),
	coupon: Joi.string().allow('').optional()
});

export interface IOrder extends Document {
	product: Types.ObjectId;
	quantity: number;
	name: string;
	phoneNumber: string;
	address: string;
	amount: number;
	coupon?: Types.ObjectId;
	merchant_prepare_id?: number;
	isPaid: boolean;
	status: 0 | 1 | -1;
}

interface IOrderModel extends IOrder, Document {}

const orderSchema: Schema = new Schema(
	{
		product: { type: Schema.Types.ObjectId, ref: 'product', required: true },
		quantity: { type: Number, required: true },
		name: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		address: { type: String, required: true },
		amount: { type: Number, required: true },
		merchant_prepare_id: { type: Number },
		coupon: { type: Schema.Types.ObjectId, ref: 'coupon' },
		isPaid: { type: Boolean, required: true, default: false },
		status: { type: Number, enum: [-1, 0, 1], required: true, default: 0 }
	},
	{ timestamps: true, versionKey: false }
);

export default model<IOrderModel>('order', orderSchema);
