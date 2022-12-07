import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { createAuthHeader } from '../utils/helpers';
import { service_id } from '../config';
import Order from '../models/order';
import ServerError from '../utils/serverError';

const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
	const { order } = req.body;
	try {
		const validOrder = await Order.findOne({ _id: order }).exec();
		if (!validOrder) return next(new ServerError(400, 'Bad request.'));

		const header = createAuthHeader();
		const response = await axios.post(
			'https://api.click.uz/v2/merchant/invoice/create',
			{
				service_id,
				amount: validOrder.amount,
				phone_number: validOrder.phoneNumber,
				merchant_trans_id: order
			},
			{
				headers: { Auth: header, 'content-type': 'application/json', Accept: 'application/json' }
			}
		);
		res.status(response.status).json(response.data);
	} catch (e) {
		next(e);
	}
};

const prepare = async (req: Request, res: Response, next: NextFunction) => {
	const { click_trans_id, merchant_trans_id, amount } = req.body;

	console.info('Prepare request: ');
	console.table({ click_trans_id, merchant_trans_id, amount });

	try {
		const order = await Order.findOne({ _id: merchant_trans_id }).exec();

		if (!order) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -5,
				error_note: 'Order does not exist'
			});
			return;
		}

		if (order.amount !== amount) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -2,
				error_note: 'Incorrect parameter amount'
			});
			return;
		}

		if (order.isPaid) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -4,
				error_note: 'Already paid'
			});
			return;
		}

		const merchant_prepare_id = Math.floor(100000 + Math.random() * 900000);
		const { ok } = await Order.updateOne({ _id: order._id }, { merchant_prepare_id }).exec();
		if (!ok) return next(new ServerError(500, 'Server error'));

		res.status(200).json({
			click_trans_id,
			merchant_trans_id,
			merchant_prepare_id,
			error: 0,
			error_note: 'Success'
		});
	} catch (error) {
		next(error);
	}
};

const complete = async (req: Request, res: Response, next: NextFunction) => {
	const { click_trans_id, merchant_trans_id, amount } = req.body;

	console.info('Complete request: ');
	console.table({ click_trans_id, merchant_trans_id, amount });

	try {
		const order = await Order.findOne({ _id: merchant_trans_id }).exec();

		if (!order) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -5,
				error_note: 'Order does not exist'
			});
			return;
		}

		if (!order.merchant_prepare_id) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -6,
				error_note: 'Transaction does not exist'
			});
			return;
		}

		if (order.isPaid) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -4,
				error_note: 'Already paid'
			});
			return;
		}

		if (order.amount !== amount) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -2,
				error_note: 'Incorrect parameter amount'
			});
			return;
		}

		const { ok } = await Order.updateOne({ _id: order._id }, { isPaid: true }).exec();
		if (!ok) return next(new ServerError(500, 'Server error'));

		res.status(200).json({
			click_trans_id,
			merchant_trans_id,
			error: 0,
			error_note: 'Success'
		});
	} catch (error) {
		next(error);
	}
};

export { prepare, complete, createInvoice };
