import { Document } from 'mongoose';

export interface IPromoCode extends Document {
	code: string;
	discount: number;
}
