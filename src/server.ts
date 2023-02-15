import "reflect-metadata";

import morgan from 'morgan';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import "~@Shared/index";

import { Database } from '~@Database/index';
import { apiRoutes } from "~@Routes/api.route";
import { authRoutes } from "~@Routes/auth.route";

dotenv.config();

const database = Database.getInstance();
database.init();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_: Request, response: Response) => {
	return response.json({ message: 'Hello world!' });
});
app.get('/health', (_: Request, response: Response) => {
	return response.json({ message: 'OK!' });
});

app.use('/api/v1', apiRoutes);
app.use('/auth/v1', authRoutes);

app.set('port', process.env.PORT || 3333);
app.listen(app.get('port'), () => {
	console.log(`[server] listening on http://localhost:${app.get('port')}`);
});
