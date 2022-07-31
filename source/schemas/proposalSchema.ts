import { Schema, HookNextFunction } from 'mongoose';
import { IProposalDocument } from '../interfaces/proposal';
import Project from '../models/projectModel';
import User from '../models/userModel';

const proposalSchema: Schema = new Schema(
	{
		price: String,
		message: String,
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		project: {
			type: Schema.Types.ObjectId,
			ref: 'Project',
			required: true
		}
	},
	{ strictQuery: true, timestamps: true }
);

proposalSchema.pre('save', async function (this: IProposalDocument, next: HookNextFunction) {
	await User.updateOne({ _id: this.author }, { $addToSet: { proposals: [this._id] } }).exec();
	await Project.updateOne({ _id: this.project }, { $addToSet: { proposals: [this._id] } }).exec();
});

proposalSchema.post('remove', async function (this: IProposalDocument, next: HookNextFunction) {
	await User.updateOne({ _id: this.author }, { $pull: { propasals: this._id } }).exec();
	await Project.updateOne({ _id: this.project }, { $pull: { propasals: this._id } }).exec();
});

export default proposalSchema;
