import Joi from 'joi';

const createInvoiceSchema = Joi.object({
	order: Joi.string().required()
});

export { createInvoiceSchema };
