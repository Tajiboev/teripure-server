import { model } from 'mongoose';
import { ICustomer } from '../interfaces/customer';
import customerSchema from '../schemas/customerSchema';

export default model<ICustomer>('Customer', customerSchema);
