import express from 'express';
import { createInvoice, prepare, complete } from '../controllers/click';

import validateBody from '../middleware/validateBody';
import { createInvoiceSchema } from '../utils/validationSchemas';
import methodError from '../middleware/methodError';

const router = express.Router();

router
	.route('/click/createInvoice')
	.post(validateBody(createInvoiceSchema), createInvoice)
	.all(methodError({ allowed: ['POST'] }));

router
	.route('/click/prepare')
	.post(prepare)
	.all(methodError({ allowed: ['POST'] }));
router
	.route('/click/complete')
	.post(complete)
	.all(methodError({ allowed: ['POST'] }));

// router
// 	.route('/payme')
// 	.post(payme)
// 	.all(methodError({ allowed: ['POST'] }));

export default router;
