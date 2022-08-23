import { model } from 'mongoose';
import { IReview } from '../interfaces/review';
import reviewSchema from '../schemas/reviewSchema';

export default model<IReview>('Review', reviewSchema);
