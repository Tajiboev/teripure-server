import { model } from 'mongoose';
import { IOrder } from '../interfaces/order';
import orderSchema from '../schemas/orderSchema';

export default model<IOrder>('Order', orderSchema);
