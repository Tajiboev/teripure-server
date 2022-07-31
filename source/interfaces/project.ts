import { Document } from 'mongoose';
import { IUserDocument } from './user';
import { IProposalDocument } from './proposal';

export interface IProject {
	title: string;
	description: string;
	budget: string;
	author: IUserDocument['_id'];
	proposals: [IProposalDocument['_id']];
	deadline: Date;
}

export interface IProjectDocument extends IProject, Document {
	createdAt: Date;
	updatedAt: Date;
}
