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

const orderSchema = Joi.object({
	product: Joi.string().required(),
	promoCode: Joi.string(),
	customer: {
		name: Joi.string().required(),
		phoneNumber: Joi.string().required().messages({ 'any.required': `"Phone number" is a required.` }),
		address: Joi.string().required()
	},
	quantity: Joi.number().required()
});

const clientSchema = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.string().required().messages({ 'any.required': `Phone number is required.` }),
	address: Joi.string().required()
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

const messageSchema = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	text: Joi.string().required()
});

const promoCodeSchema = Joi.object({
	code: Joi.string().required(),
	discount: Joi.number().min(0.01).max(1).required()
});

export {
	loginSchema,
	productSchema,
	orderSchema,
	clientSchema,
	signupSchema,
	subscribeSchema,
	reviewSchema,
	messageSchema,
	promoCodeSchema
};
