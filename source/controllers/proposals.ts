import { NextFunction, Request, Response } from 'express';
import Proposal from '../models/proposalModel';

const addProposal = (req: Request, res: Response, next: NextFunction) => {
	const { title, message, price } = req.body;
	const { uid } = res.locals;

	Proposal.create({
		author: uid,
		title,
		message,
		price
	})
		.then((proposal) => {
			res.status(201).json(proposal);
		})
		.catch(next);
};

export { addProposal };
