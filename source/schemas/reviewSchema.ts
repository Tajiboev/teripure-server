import { Schema } from 'mongoose';
import { IReview } from '../interfaces/review';

const reviewSchema = new Schema<IReview>(
	{
		author: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		phoneNumber: {
			type: String,
			required: true
		},
		rating: {
			type: Number,
			required: true
		}
	},
	{ strictQuery: true, timestamps: true }
);

export default reviewSchema;
