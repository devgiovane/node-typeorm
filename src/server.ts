import "reflect-metadata";

import morgan from 'morgan';
import express, { Request, Response } from 'express';

import "~@Shared/index";

import { Database } from '~@Database/index';
import { apiRoutes } from "~@Routes/api.route";

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

app.listen(3333, () => {
	console.log('[server] listening on http://localhost:3333');
});
