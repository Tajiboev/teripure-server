import express from 'express';
import { createInvoice, prepare, complete } from '../controllers/payment';

const router = express.Router();

import methodError from '../utils/methodError';

router
	.route('/click/createInvoice')
	.post(createInvoice)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/click/prepare')
	.post(prepare)
	.all(methodError({ allowed: ['POST'] }));
router
	.route('/click/complete')
	.post(complete)
	.all(methodError({ allowed: ['POST'] }));

export default router;
