import { Document } from 'mongoose';

export interface IReview extends Document {
	author: string;
	text: string;
	phoneNumber: string;
	rating: number;
	pubished: boolean;
}
