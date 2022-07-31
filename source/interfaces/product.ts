import { Document } from 'mongoose';

export interface IProduct {
	name: string;
	price: string;
	description: string;
	slug: string;
}

export interface IProductDocument extends IProduct, Document {
	createdAt: Date;
	updatedAt: Date;
}
