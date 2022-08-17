import { model } from 'mongoose';
import { IReviewDocument } from '../interfaces/review';
import reviewSchema from '../schemas/reviewSchema';

export default model<IReviewDocument>('Message', reviewSchema);
