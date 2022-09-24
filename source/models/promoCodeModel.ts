import { model, Document, Schema } from 'mongoose';

export interface IPromoCode extends Document {
	code: string;
	discount: number;
}

export interface IPromoCodeModel extends IPromoCode, Document {}

const promoCodeSchema: Schema = new Schema(
	{
		discount: { type: Number, required: true },
		code: { type: String, required: true }
	},
	{ timestamps: true, versionKey: false }
);

export default model<IPromoCodeModel>('promocode', promoCodeSchema);
