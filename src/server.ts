import "reflect-metadata";

import morgan from 'morgan';
import express, { Request, Response } from 'express';

import { categoryRoutes } from '~@Routes/category.routes';
import { specificationRoutes } from "~@Routes/specification.route";

import "./shared";

import { Database } from './database';

const database = Database.getInstance();
database.init();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_: Request, response: Response) => {
	return response.json({ message: 'Hello world!' });
});

app.use('/category', categoryRoutes);
app.use('/specifications', specificationRoutes);

app.listen(3333, () => {
	console.log('[server] listening on http://localhost:3333')
});
