import bcrypt from 'bcrypt';
import { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: [true, 'Email is required'],
			maxlength: [64, "Email can't be greater than 64 characters"],
			unique: true,
			index: true,
			lowercase: true
		},
		password: { type: String, required: true },
		firstName: {
			type: String,
			required: [true, 'First name is required'],
			minlength: [2, "First name can't be smaller than 2 characters"],
			maxlength: [30, "First name can't be greater than 30 characters"]
		},
		lastName: {
			type: String,
			required: [true, 'Last name is required'],
			minlength: [2, "Last name can't be smaller than 2 characters"],
			maxlength: [30, "Last name can't be greater than 30 characters"]
		}
	},
	{ strictQuery: true, timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	const user = this as IUser;
	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default userSchema;
