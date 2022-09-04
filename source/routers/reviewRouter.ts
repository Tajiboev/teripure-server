import express from 'express';
import { createReview, listReviews, updateReview, deleteReview } from '../controllers/reviews';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { reviewSchema, reviewUpdateSchema } from '../utils/validationSchemas';

router
	.route('/')
	.post(validateBody(reviewSchema), createReview)
	.get(listReviews)
	.patch(validateBody(reviewUpdateSchema), updateReview)
	.delete(deleteReview)
	.all(methodError({ allowed: ['POST', 'GET', 'PATCH', 'DELETE'] }));

export default router;
