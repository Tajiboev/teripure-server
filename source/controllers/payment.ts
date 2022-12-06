import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { createAuthHeader } from '../utils/helpers';
import { service_id } from '../config';
import Order from '../models/order';

interface createInvoiceResponse {
	error_code: string;
	error_note: string;
	invoice_id: number;
}

// const session = await mongoose.startSession();

// try {
// 	session.startTransaction();

// 	const customer = await Customer.findOne({ phoneNumber });

// 	const [order] = await Order.create([{ customer, title }], { session });
// 	await User.findByIdAndUpdate(author, { $push: { posts: order._id } }, { session });

// 	await session.commitTransaction();

// 	res.status(200).json(order);
// } catch (error) {
// 	await session.abortTransaction();
// 	return next(new ServerError(400, 'Bad request'));
// } finally {
// 	session.endSession();
// }

const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
	const { amount, phone_number, merchant_trans_id } = req.body;
	const header = createAuthHeader();
	try {
		const response = await axios.post<createInvoiceResponse>(
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
		res.status(response.status).json(response.data);
	} catch (e) {
		next(e);
	}
};

const prepare = async (req: Request, res: Response, next: NextFunction) => {
	const { click_trans_id, merchant_trans_id, amount } = req.body;

	try {
		const order = await Order.findOne({ _id: merchant_trans_id });

		if (!order) {
			res.status(400).json({
				click_trans_id,
				merchant_trans_id,
				error: -5,
				error_note: 'User does not exist'
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
	} catch (error) {
		next(error);
	}
};

const complete = async (req: Request, res: Response, next: NextFunction) => {
	const { click_trans_id, merchant_trans_id, amount } = req.body;

	try {
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
	} catch (error) {
		next(error);
	}
};

// //payme

// const payme = async (req: Request, res: Response, next: NextFunction) => {
// 	const { id: request_id, method, params } = req.body;

// 	if (method === 'CheckPerformTransaction') {
// 		try {
// 			const { account, amount } = params;

// 			const order = await Order.findOne({ _id: account.order_id }).exec();
// 			if (!order) {
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					error: {
// 						code: '-31050'
// 					}
// 				});
// 				return;
// 			}
// 			if (amount !== order.amount) {
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					error: {
// 						code: '-31001'
// 					}
// 				});
// 				return;
// 			}

// 			res.status(200).json({
// 				jsonrpc: '2.0',
// 				id: request_id,
// 				result: {
// 					allow: true
// 				}
// 			});
// 		} catch (error) {
// 			return next(error);
// 		}
// 	}

// 	if (method === 'CreateTransaction') {
// 		try {
// 			const { id, account } = params;

// 			const transaction = await Transaction.findOne({ _id: id }).exec();
// 			if (!transaction) {
// 				let new_transaction = await Transaction.create({
// 					_id: id,
// 					create_time: Date.now(),
// 					state: 1,
// 					order: account.order_id
// 				});
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					result: {
// 						create_time: new_transaction.create_time,
// 						transaction: new_transaction._id,
// 						state: new_transaction.state,
// 						receivers: null
// 					},
// 					error: null
// 				});
// 				return;
// 			}

// 			res.status(200).json({
// 				jsonrpc: '2.0',
// 				id: request_id,
// 				result: {
// 					create_time: transaction.create_time,
// 					transaction: transaction._id,
// 					state: transaction.state,
// 					receivers: null
// 				},
// 				error: null
// 			});
// 		} catch (error) {
// 			return next(error);
// 		}
// 	}
// 	if (method === 'PerformTransaction') {
// 		try {
// 			const { id } = params;
// 			const transaction = await Transaction.findOne({ _id: id }).exec();
// 			if (!transaction) {
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					error: {
// 						code: '-31003'
// 					}
// 				});
// 				return;
// 			}

// 			if (transaction.state === 2) {
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					result: {
// 						perform_time: transaction.create_time,
// 						transaction: transaction._id,
// 						state: transaction.state
// 					}
// 				});
// 				return;
// 			}

// 			// implement timeout

// 			await Order.findOneAndUpdate({ _id: transaction.order }, { isPad: true }).exec();

// 			let updates = {
// 				perform_time: Date.now(),
// 				state: 2
// 			};

// 			Object.assign(transaction, updates);
// 			const updated_transaction = await transaction.save();

// 			res.status(200).json({
// 				jsonrpc: '2.0',
// 				id: request_id,
// 				result: {
// 					perform_time: updated_transaction.create_time,
// 					transaction: updated_transaction._id,
// 					state: updated_transaction.state
// 				}
// 			});
// 		} catch (error) {
// 			return next(error);
// 		}
// 	}

// 	if (method === 'CancelTransaction') {
// 		try {
// 			const { id } = params;
// 			const transaction = await Transaction.findOne({ _id: id }).exec();
// 			if (!transaction) {
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					error: {
// 						code: '-31003'
// 					}
// 				});
// 				return;
// 			}
// 			if (transaction.state === 2) {
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					error: {
// 						code: '-31007'
// 					}
// 				});
// 			}
// 		} catch (error) {
// 			return next(error);
// 		}
// 	}

// 	if (method === 'CheckTransaction') {
// 		try {
// 			const { id } = params;
// 			const transaction = await Transaction.findOne({ _id: id }).exec();
// 			if (!transaction) {
// 				res.status(200).json({
// 					jsonrpc: '2.0',
// 					id: request_id,
// 					error: {
// 						code: '-31003'
// 					}
// 				});
// 				return;
// 			}

// 			res.status(200).json({
// 				jsonrpc: '2.0',
// 				id: request_id,
// 				result: {
// 					create_time: transaction.create_time,
// 					perform_time: transaction.create_time,
// 					cancel_time: transaction.create_time,
// 					transaction: transaction._id,
// 					state: transaction.state,
// 					reason: transaction.reason
// 				},
// 				error: null
// 			});
// 		} catch (error) {
// 			return next(error);
// 		}
// 	}
// };

export { prepare, complete, createInvoice };
