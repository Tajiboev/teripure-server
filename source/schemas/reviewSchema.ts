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
		},
		status: {
			type: String,
			required: true,
			default: 'в ожидании'
		}
	},
	{ strictQuery: true, timestamps: true }
);

export default reviewSchema;
