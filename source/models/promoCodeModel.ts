import { model } from 'mongoose';
import { IPromoCode } from '../interfaces/promoCode';
import promoCodeSchema from '../schemas/promoCodeSchema';

export default model<IPromoCode>('PromoCode', promoCodeSchema);
