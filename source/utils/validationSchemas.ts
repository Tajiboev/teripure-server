import Joi from 'joi';

const createInvoiceSchema = Joi.object({
	amount: Joi.number().required(),
	phone_number: Joi.string().required(),
	merchant_trans_id: Joi.string().required()
});

export { createInvoiceSchema };
