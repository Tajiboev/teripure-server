import { Document } from 'mongoose';
import { IProjectDocument } from './project';
import { IProposalDocument } from './proposal';

export interface IUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	projects: [IProjectDocument['_id']];
	propasals: [IProposalDocument['_id']];
}
export interface IUserDocument extends IUser, Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}
