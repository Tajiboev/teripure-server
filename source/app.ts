import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

// import authRouter from './routers/authRouter';
import productRouter from './routers/product';
import orderRouter from './routers/order';
import subscribeRouter from './routers/subscriber';
import reviewRouter from './routers/review';
import messageRouter from './routers/message';
import promoCodeRouter from './routers/coupon';
import paymentRouter from './routers/payment';

//middleware
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();

app.disable('etag');
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/auth', authRouter);

app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/coupons', promoCodeRouter);
app.use('/subscribers', subscribeRouter);
app.use('/reviews', reviewRouter);
app.use('/messages', messageRouter);
app.use('/payment', paymentRouter);

// healthcheck
app.get('/healthcheck', async (req, res) => {
	res.sendStatus(200);
});

//error handler
app.use(notFound);
app.use(errorHandler);

export default app;
