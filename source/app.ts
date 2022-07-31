import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { errorHandler, notFound } from './errorHandler';

import authRouter from './routers/auth';
import projectRouter from './routers/projects';

const app = express();

app.disable('etag');
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/projects', projectRouter);

// healthcheck
app.get('/healthcheck', async (req, res) => {
	res.sendStatus(200);
});

//error handler
app.use(notFound);
app.use(errorHandler);

export default app;
