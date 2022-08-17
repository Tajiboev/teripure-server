import { model } from 'mongoose';
import { IMessageDocument } from '../interfaces/message';
import messageSchema from '../schemas/messageSchema';

export default model<IMessageDocument>('Message', messageSchema);
