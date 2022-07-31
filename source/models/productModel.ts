import { model } from 'mongoose';
import { IProductDocument } from '../interfaces/product';
import productSchema from '../schemas/productSchema';

export default model<IProductDocument>('Product', productSchema);
