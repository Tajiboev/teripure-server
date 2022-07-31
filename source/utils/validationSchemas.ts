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
	name: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	address: Joi.string().required(),
	quantity: Joi.number().required()
});

const clientSchema = Joi.object({
	name: Joi.string().required(),
	phoneNumber: Joi.string().required(),
	address: Joi.string().required()
});

export { loginSchema, productSchema, orderSchema, clientSchema, signupSchema };
