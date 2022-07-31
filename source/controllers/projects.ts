import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import Project from '../models/projectModel';
import User from '../models/userModel';

const listProjects = (req: Request, res: Response, next: NextFunction) => {
	Project.find()
		.populate('author', '_id', User)
		.exec()
		.then((result) => {
			res.status(200).json({ data: result });
		})
		.catch(next);
};

const addProject = async (req: Request, res: Response, next: NextFunction) => {
	const { title, description, budget, deadline } = req.body;
	const { uid } = res.locals;

	Project.create({
		author: uid,
		title,
		description,
		budget,
		deadline
	})
		.then((project) => res.status(201).json(project))
		.catch(next);
};

const oneProject = (req: Request, res: Response, next: NextFunction) => {
	const { id } = req.params;
	Project.findById(id)
		.exec()
		.then((project) => {
			if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);
			res.status(200).json({ data: project });
		})
		.catch(next);
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const { uid } = res.locals;

		const project = await Project.findById(id).exec();
		if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);

		if (project.author != uid) throw new createHttpError.Unauthorized('You cannot delete this');

		await project.remove();

		res.status(200).json({ message: `Project ${project._id} has been deleted` });
	} catch (e) {
		next(e);
	}
};

const updateProject = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const updates = req.body;
		const { id } = req.params;
		const { uid } = res.locals;

		const project = await Project.findById(id).exec();
		if (!project) throw new createHttpError.NotFound(`project with the id ${id} not found`);
		if (project.author != uid) throw new createHttpError.Unauthorized('You cannot delete this');

		const result = await project.updateOne(updates).exec();

		res.status(200).json({ data: result });
	} catch (e) {
		next(e);
	}
};

export { listProjects, oneProject, deleteProject, addProject, updateProject };
