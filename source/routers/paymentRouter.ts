import express from 'express';
import { createInvoice, prepare, complete } from '../controllers/payment';

const router = express.Router();

// import validateBody from '../middleware/validateBody';
import methodError from '../utils/methodError';

router
	.route('/createInvoice')
	.post(createInvoice)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/prepare')
	.post(prepare)
	.all(methodError({ allowed: ['POST'] }));
router
	.route('/complete')
	.post(complete)
	.all(methodError({ allowed: ['POST'] }));

export default router;
