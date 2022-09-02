import { Schema } from 'mongoose';
import { IPromoCode } from '../interfaces/promoCode';

const promoCodeSchema = new Schema<IPromoCode>(
	{
		discount: { type: Number, required: true },
		code: { type: String, required: true }
	},
	{ strictQuery: true, timestamps: true }
);

export default promoCodeSchema;
