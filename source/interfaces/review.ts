import { Document } from 'mongoose';

export interface IReview {
	author: string;
	review: string;
	rating: number;
}

export interface IReviewDocument extends IReview, Document {
	createdAt: Date;
	updatedAt: Date;
}
