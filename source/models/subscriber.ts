import Joi from 'joi';
import { model, Document, Schema } from 'mongoose';

export const subscriberInput = Joi.object({
	email: Joi.string().email().lowercase().required()
});

interface ISubscriber extends Document {
	email: string;
	isActive: boolean;
}
interface ISubscriberModel extends ISubscriber, Document {}

const subscriberSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	{ timestamps: true, versionKey: false }
);

export default model<ISubscriberModel>('subscriber', subscriberSchema);
