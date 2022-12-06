import { model, Document, Schema } from 'mongoose';
import Joi from 'joi';

export const couponInput = Joi.object({
	code: Joi.string().required(),
	discount: Joi.number().min(0.01).max(1).required()
});

interface ICoupon extends Document {
	code: string;
	discount: number;
}

interface ICouponModel extends ICoupon, Document {}

const couponCodeSchema: Schema = new Schema(
	{
		discount: { type: Number, required: true },
		code: { type: String, required: true }
	},
	{ timestamps: true, versionKey: false }
);

export default model<ICouponModel>('coupon', couponCodeSchema);
