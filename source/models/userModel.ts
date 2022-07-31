import { model } from 'mongoose';
import { IUserDocument } from '../interfaces/user';
import userSchema from '../schemas/userSchema';

export default model<IUserDocument>('User', userSchema);
