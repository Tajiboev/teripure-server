import { Schema } from 'mongoose';
import { IProduct } from '../interfaces/product';

const productSchema = new Schema<IProduct>(
	{
		price: { type: Number, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		slug: { type: String, required: true }
	},
	{ strictQuery: true, timestamps: true }
);

export default productSchema;
