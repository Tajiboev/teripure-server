import { NextFunction, Request, Response } from 'express';
import PromoCode from '../models/promoCodeModel';

const createPromoCode = (req: Request, res: Response, next: NextFunction) => {
	const { code, discount } = req.body;

	PromoCode.create({
		code,
		discount
	})
		.then((promoCode) => {
			res.status(201).json(promoCode);
		})
		.catch(next);
};

const listPromoCodes = (req: Request, res: Response, next: NextFunction) => {
	PromoCode.find()
		.exec()
		.then((promoCodes) => {
			res.status(200).json(promoCodes);
		})
		.catch(next);
};

const deletePromoCode = (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	PromoCode.deleteOne({ _id: id })
		.exec()
		.then((product) => {
			if (product) {
				res.status(200).json(product);
			} else {
				res.status(404).json({ message: 'No product found for provided ID' });
			}
		})
		.catch(next);
};

export { createPromoCode, listPromoCodes, deletePromoCode };
