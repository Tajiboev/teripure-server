import bcrypt from 'bcrypt';
import { Schema, HookNextFunction } from 'mongoose';
import { IUserDocument } from '../interfaces/user';

const userSchema: Schema = new Schema(
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
		},
		projects: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Project'
			}
		],

		proposals: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Proposal'
			}
		]
	},
	{ strictQuery: true, timestamps: true }
);

userSchema.pre('save', async function (this: IUserDocument, next: HookNextFunction) {
	if (!this.isModified('password')) return next();

	try {
		const salt = await bcrypt.genSalt(10);

		const hash = await bcrypt.hash(this.password, salt);

		this.password = hash;
	} catch (e) {
		return next(e);
	}

	return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
	const user = this as IUserDocument;
	return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

export default userSchema;
