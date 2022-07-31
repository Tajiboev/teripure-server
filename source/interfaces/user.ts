import { Document } from 'mongoose';

export interface IUser {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}
export interface IUserDocument extends IUser, Document {
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}
