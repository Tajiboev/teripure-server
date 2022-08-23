import { model } from 'mongoose';
import { IProduct } from '../interfaces/product';
import productSchema from '../schemas/productSchema';

export default model<IProduct>('Product', productSchema);
