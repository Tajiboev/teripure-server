import { model, Document, Schema } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	price: number;
	description: string;
	slug: string;
}

export interface IProductModel extends IProduct, Document {}

const productSchema: Schema = new Schema(
	{
		price: { type: Number, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
		slug: { type: String, required: true }
	},
	{ timestamps: true, versionKey: false }
);

export default model<IProductModel>('product', productSchema);
