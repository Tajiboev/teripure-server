import { Document, Schema, model } from 'mongoose';

export interface ITransaction extends Document {
	order: Schema.Types.ObjectId;
	state: number;
	create_time: number;
	perform_time: number;
	cancel_time: number;
	reason: string | null;
}

export interface ITransactionModel extends ITransaction, Document {}

const transactionSchema: Schema = new Schema(
	{
		state: {
			type: Number,
			default: 0,
			required: true
		},
		order: {
			type: Schema.Types.ObjectId,
			ref: 'order',
			required: true
		},
		create_time: {
			type: Number,
			required: true
		},
		perform_time: {
			type: Number,
			default: 0,
			required: true
		},
		cancel_time: {
			type: Number,
			default: 0,
			required: true
		},
		reason: {
			type: String,
			default: null
		}
	},
	{ versionKey: false }
);

export default model<ITransactionModel>('transaction', transactionSchema);
