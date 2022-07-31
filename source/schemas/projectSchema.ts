import { Schema, HookNextFunction } from 'mongoose';
import { IProjectDocument } from '../interfaces/project';
import User from '../models/userModel';

const projectSchema: Schema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		budget: {
			type: String,
			required: true
		},
		deadline: {
			type: Date,
			required: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		proposals: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Proposal'
			}
		]
	},
	{ strictQuery: true, timestamps: true }
);

projectSchema.pre('save', async function (this: IProjectDocument, next: HookNextFunction) {
	await User.updateOne({ _id: this.author }, { $addToSet: { projects: [this._id] } }).exec();
});

projectSchema.post('remove', async function (this: IProjectDocument, next: HookNextFunction) {
	await User.updateOne({ _id: this.author }, { $pull: { projects: this._id } }).exec();
});

export default projectSchema;
