import axios from 'axios';
import { NextFunction, Request, Response } from 'express';
import { createAuthHeader } from '../utils/helpers';

const prepare = async (req: Request, res: Response, next: NextFunction) => {
	const { click_trans_id, merchant_trans_id } = req.body;
	console.log(
		JSON.stringify({
			click_trans_id,
			merchant_trans_id,
			merchant_prepare_id: '6023145',
			error: 0,
			error_note: 'No error'
		})
	);
	res.status(200).json({
		click_trans_id,
		merchant_trans_id,
		merchant_prepare_id: '6023145',
		error: 0,
		error_note: 'No error'
	});
};

const createInvoice = async (req: Request, res: Response, next: NextFunction) => {
	const { amount, phone_number, merchant_trans_id } = req.body;
	const header = createAuthHeader();
	const response = await axios.post(
		'https://api.click.uz/v2/merchant/invoice/create',
		{
			service_id: '24817',
			amount,
			phone_number,
			merchant_trans_id
		},
		{
			headers: { Auth: header, 'content-type': 'application/json', Accept: 'application/json' }
		}
	);
	console.log('Create invoice response: ' + JSON.stringify(response));
	res.status(200).json(response);
};

const complete = async (req: Request, res: Response, next: NextFunction) => {
	console.log(JSON.stringify(req.body));
	res.status(500).send('error');
};

export { prepare, complete, createInvoice };
