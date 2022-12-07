import Joi from 'joi';
import { model, Document, Schema } from 'mongoose';

export const reviewInput = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.string().pattern(new RegExp('^\\+998[0-9]{9}$')).required(),
	text: Joi.string().required(),
	rating: Joi.number().integer().max(5).min(1).required()
});

interface IReview extends Document {
	name: string;
	phoneNumber: string;
	text: string;
	rating: number;
	isPubished: boolean;
}

interface IReviewModel extends IReview, Document {}

const reviewSchema: Schema = new Schema(
	{
		name: {
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
		isPublished: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{ timestamps: true, versionKey: false }
);

export default model<IReviewModel>('review', reviewSchema);
