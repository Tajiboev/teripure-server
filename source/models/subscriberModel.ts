import { model, Document, Schema } from 'mongoose';

export interface ISubscriber extends Document {
	email: string;
	isActive: boolean;
}
export interface ISubscriberModel extends ISubscriber, Document {}

const subscribeSchema: Schema = new Schema(
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

export default model<ISubscriberModel>('subscriber', subscribeSchema);
