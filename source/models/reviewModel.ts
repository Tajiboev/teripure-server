import { model, Document, Schema } from 'mongoose';

export interface IReview extends Document {
	author: string;
	text: string;
	phoneNumber: string;
	rating: number;
	pubished: boolean;
}

export interface IReviewModel extends IReview, Document {}

const reviewSchema: Schema = new Schema(
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
		published: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true, versionKey: false }
);

export default model<IReviewModel>('review', reviewSchema);
