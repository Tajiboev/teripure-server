import { Document, Schema, Types, model } from 'mongoose';

export interface ICustomer {
	address: string;
	phoneNumber: string;
	name: string;
	orders: [Types.ObjectId];
	confirmationCode?: number;
}

export interface ICustomerModel extends ICustomer, Document {}

const customerSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		phoneNumber: {
			type: String,
			required: true,
			unique: true
		},
		address: {
			type: String,
			required: true
		},
		orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
		confirmationCode: { type: Number }
	},
	{ timestamps: true, versionKey: false }
);

export default model<ICustomerModel>('customer', customerSchema);
