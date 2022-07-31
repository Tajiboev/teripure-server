import { model } from 'mongoose';
import { IOrderDocument } from '../interfaces/order';
import orderSchema from '../schemas/orderSchema';

export default model<IOrderDocument>('Order', orderSchema);
