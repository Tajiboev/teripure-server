import Joi from 'joi';

const loginSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$')).required()
});

const signupSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	firstName: Joi.string().required(),
	lastName: Joi.string().required(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,24}$')).required()
});

const productSchema = Joi.object({
	price: Joi.number().required(),
	name: Joi.string().required(),
	description: Joi.string().required()
});

const clientSchema = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	address: Joi.string().required()
});

const orderSchema = Joi.object({
	product: Joi.string().required(),
	promoCode: Joi.string().allow(''),
	customer: clientSchema.required(),
	quantity: Joi.number().required()
});

const subscribeSchema = Joi.object({
	email: Joi.string().email().lowercase().required()
});

const reviewSchema = Joi.object({
	author: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	text: Joi.string().required(),
	rating: Joi.number().max(5).min(1).required()
});

const reviewUpdateSchema = Joi.object({
	status: Joi.string().required(),
	_id: Joi.string().required()
});
const reviewDeleteSchema = Joi.object({
	_id: Joi.string().required()
});

const messageSchema = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	text: Joi.string().required()
});

const promoCodeSchema = Joi.object({
	code: Joi.string().required(),
	discount: Joi.number().min(0.01).max(1).required()
});

const createInvoiceSchema = Joi.object({
	amount: Joi.number().required(),
	phone_number: Joi.string().required(),
	merchant_trans_id: Joi.string().required()
});

export {
	createInvoiceSchema,
	loginSchema,
	productSchema,
	orderSchema,
	clientSchema,
	signupSchema,
	subscribeSchema,
	reviewSchema,
	reviewUpdateSchema,
	reviewDeleteSchema,
	messageSchema,
	promoCodeSchema
};
