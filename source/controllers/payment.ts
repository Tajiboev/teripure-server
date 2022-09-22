import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { createAuthHeader } from '../utils/helpers';
import { service_id } from '../config';
import Order from '../models/orderModel';

const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
	const { amount, phone_number, merchant_trans_id } = req.body;
	const header = createAuthHeader();
	try {
		const response = await axios.post(
			'https://api.click.uz/v2/merchant/invoice/create',
			{
				service_id,
				amount,
				phone_number,
				merchant_trans_id
			},
			{
				headers: { Auth: header, 'content-type': 'application/json', Accept: 'application/json' }
			}
		);
		res.status(200).json(response);
	} catch (e) {
		next(e);
	}
};

const prepare = async (req: Request, res: Response, next: NextFunction) => {
	const { click_trans_id, merchant_trans_id, amount } = req.body;

	const order = await Order.findOne({ _id: merchant_trans_id });

	if (!order) {
		res.status(400).json({
			click_trans_id,
			merchant_trans_id,
			error: -5,
			error_note: 'User does not exist'
		});
		return next();
	}

	if (order.amount !== amount) {
		res.status(400).json({
			click_trans_id,
			merchant_trans_id,
			error: -2,
			error_note: 'Incorrect parameter amount'
		});
		return next();
	}

	if (order.isPaid) {
		res.status(400).json({
			click_trans_id,
			merchant_trans_id,
			error: -4,
			error_note: 'Already paid'
		});
		return next();
	}

	const prepareId = Math.floor(100000 + Math.random() * 900000);
	order.merchant_prepare_id = prepareId;
	await order.save();
	res.status(200).json({
		click_trans_id,
		merchant_trans_id,
		merchant_prepare_id: prepareId,
		error: 0,
		error_note: 'Success'
	});
};

const complete = async (req: Request, res: Response, next: NextFunction) => {
	const { click_trans_id, merchant_trans_id, amount } = req.body;

	const order = await Order.findOne({ _id: merchant_trans_id });

	if (!order) {
		res.status(400).json({
			click_trans_id,
			merchant_trans_id,
			error: -5,
			error_note: 'User does not exist'
		});
		return next();
	}

	if (!order.merchant_prepare_id) {
		res.status(400).json({
			click_trans_id,
			merchant_trans_id,
			error: -6,
			error_note: 'Transaction does not exist'
		});
		return next();
	}

	if (order.isPaid) {
		res.status(400).json({
			click_trans_id,
			merchant_trans_id,
			error: -4,
			error_note: 'Already paid'
		});
		return next();
	}

	if (order.amount !== amount) {
		res.status(400).json({
			click_trans_id,
			merchant_trans_id,
			error: -2,
			error_note: 'Incorrect parameter amount'
		});
		return next();
	}

	order.isPaid = true;
	await order.save();

	res.status(200).json({
		click_trans_id,
		merchant_trans_id,
		error: 0,
		error_note: 'Success'
	});
};

export { prepare, complete, createInvoice };
