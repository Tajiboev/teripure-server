import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import Order from '../models/orderModel';

const listOrders = (req: Request, res: Response, next: NextFunction) => {
	Order.find()
		.exec()
		.then((result) => {
			res.status(200).json({ data: result });
		})
		.catch(next);
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
	const { name, phoneNumber, address, product } = req.body;
	const orderId = crypto.randomBytes(6).toString('hex').substring(0, 6).toUpperCase();

	Order.create({ name, phoneNumber, address, product, orderId })
		.then((order) => {
			res.status(201).json(order);
		})
		.catch(next);
};

const orderInfo = (req: Request, res: Response, next: NextFunction) => {
	const orderId = req.params.orderId;
	Order.findOne({ orderId })
		.then((order) => {
			if (order) {
				res.status(200).json(order);
			} else {
				res.status(404).json({ message: 'No order found for provided ID' });
			}
		})
		.catch(next);
};

// const oneProject = (req: Request, res: Response, next: NextFunction) => {
// 	const { id } = req.params;
// 	Project.findById(id)
// 		.exec()
// 		.then((project) => {
// 			if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);
// 			res.status(200).json({ data: project });
// 		})
// 		.catch(next);
// };

// const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const { id } = req.params;
// 		const { uid } = res.locals;

// 		const project = await Project.findById(id).exec();
// 		if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);

// 		if (project.author != uid) throw new createHttpError.Unauthorized('You cannot delete this');

// 		await project.remove();

// 		res.status(200).json({ message: `Project ${project._id} has been deleted` });
// 	} catch (e) {
// 		next(e);
// 	}
// };

// const updateProject = async (req: Request, res: Response, next: NextFunction) => {
// 	try {
// 		const updates = req.body;
// 		const { id } = req.params;
// 		const { uid } = res.locals;

// 		const project = await Project.findById(id).exec();
// 		if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);
// 		if (project.author != uid) throw new createHttpError.Unauthorized('You cannot delete this');

// 		const result = await project.updateOne(updates).exec();

// 		res.status(200).json({ data: result });
// 	} catch (e) {
// 		next(e);
// 	}
// };

export { createOrder, listOrders, orderInfo };
