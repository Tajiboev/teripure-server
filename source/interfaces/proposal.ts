import { Document } from 'mongoose';
import { IUserDocument } from './user';
import { IProjectDocument } from './project';

export interface IProposal {
	author: IUserDocument['_id'];
	message: string;
	title: string;
	price: string;
	project: IProjectDocument['_id'];
}

export interface IProposalDocument extends IProposal, Document {
	createdAt: Date;
	updatedAt: Date;
}
