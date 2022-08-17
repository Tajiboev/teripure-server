import express from 'express';
import { createReview, listReviews } from '../controllers/reviews';

const router = express.Router();

import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';
import { reviewSchema } from '../utils/validationSchemas';

router
	.route('/')
	.post(validateBody(reviewSchema), createReview)
	.get(listReviews)
	.all(methodError({ allowed: ['POST', 'GET'] }));

export default router;
