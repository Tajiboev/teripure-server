import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { errorHandler, notFound } from './errorHandler';

// import authRouter from './routers/authRouter';
import productRouter from './routers/productRouter';
import orderRouter from './routers/orderRouter';
import authRouter from './routers/authRouter';
import subscribeRouter from './routers/subscribeRouter';
import reviewRouter from './routers/reviewRouter';
import messageRouter from './routers/messageRouter';
import promoCodeRouter from './routers/promoCodeRouter';

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
app.use('/promo-codes', promoCodeRouter);
app.use('/auth', authRouter);
app.use('/subscribe', subscribeRouter);
app.use('/reviews', reviewRouter);
app.use('/messages', messageRouter);

// healthcheck
app.get('/healthcheck', async (req, res) => {
	res.sendStatus(200);
});

//error handler
app.use(notFound);
app.use(errorHandler);

export default app;
