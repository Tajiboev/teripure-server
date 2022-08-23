import { model } from 'mongoose';
import { IMessage } from '../interfaces/message';
import messageSchema from '../schemas/messageSchema';

export default model<IMessage>('Message', messageSchema);
