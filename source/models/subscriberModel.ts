import { model } from 'mongoose';
import { ISubscriberDocument } from '../interfaces/subscriber';
import subscribeSchema from '../schemas/subscribeSchema';

export default model<ISubscriberDocument>('Subscriber', subscribeSchema);
