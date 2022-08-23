import { model } from 'mongoose';
import { IUser } from '../interfaces/user';
import userSchema from '../schemas/userSchema';

export default model<IUser>('User', userSchema);
