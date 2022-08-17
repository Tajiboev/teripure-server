import { NextFunction, Request, Response } from 'express';
import slugify from 'slugify';
import Product from '../models/productModel';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
	const { name, description, price } = req.body;
	const slug = slugify(name, { lower: true, trim: true });

	Product.create({
		name,
		description,
		price,
		slug
	})
		.then((product) => {
			res.status(201).json(product);
		})
		.catch(next);
};

const listProducts = (req: Request, res: Response, next: NextFunction) => {
	Product.find()
		.then((products) => {
			res.status(200).json(products);
		})
		.catch(next);
};

const productInfo = (req: Request, res: Response, next: NextFunction) => {
	const slug = req.params.slug;
	Product.findOne({ slug })
		.then((product) => {
			if (product) {
				res.status(200).json(product);
			} else {
				res.status(404).json({ message: 'No product found for provided ID' });
			}
		})
		.catch(next);
};

export { createProduct, listProducts, productInfo };
