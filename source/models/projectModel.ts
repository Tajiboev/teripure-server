import { model } from 'mongoose';
import { IProjectDocument } from '../interfaces/project';
import projectSchema from '../schemas/projectSchema';

export default model<IProjectDocument>('Project', projectSchema);
