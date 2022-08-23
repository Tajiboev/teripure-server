import { model } from 'mongoose';
import { ISubscriber } from '../interfaces/subscriber';
import subscribeSchema from '../schemas/subscribeSchema';

export default model<ISubscriber>('Subscriber', subscribeSchema);
