import { Schema, HookNextFunction } from 'mongoose';
import slugify from 'slugify';
import { IProductDocument } from '../interfaces/product';

const productSchema: Schema = new Schema(
	{
		price: { type: Number, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		slug: { type: String, required: true }
	},
	{ strictQuery: true, timestamps: true }
);

export default productSchema;
