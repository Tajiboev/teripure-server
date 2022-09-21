import { Schema } from 'mongoose';
import { ICustomer } from '../interfaces/customer';

const customerSchema = new Schema<ICustomer>(
	{
		name: {
			type: String,
			required: [true, 'Name is required']
		},
		phoneNumber: {
			type: String,
			required: [true, 'Phone number is required'],
			unique: [true, 'User already registered']
		},
		address: {
			type: String,
			required: [true, 'Address is required']
		},
		orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
		confirmationCode: { type: Number }
	},
	{ strictQuery: true, timestamps: true }
);

export default customerSchema;
