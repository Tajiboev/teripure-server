import Joi from 'joi';
import { model, Document, Schema } from 'mongoose';

export const productInput = Joi.object({
	price: Joi.number().required(),
	name: Joi.string().required(),
	description: Joi.string().required()
});

interface IProduct extends Document {
	name: string;
	price: number;
	description: string;
}

interface IProductModel extends IProduct, Document {}

const productSchema: Schema = new Schema(
	{
		price: { type: Number, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true }
	},
	{ timestamps: true, versionKey: false }
);

export default model<IProductModel>('product', productSchema);
