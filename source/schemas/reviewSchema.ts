import { Schema } from 'mongoose';

const reviewSchema: Schema = new Schema(
	{
		author: {
			type: String,
			required: true
		},
		review: {
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
