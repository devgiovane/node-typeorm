import "reflect-metadata";

import express, { Request, Response } from 'express';

import { categoryRoutes } from './routes/category.routes';
import { specificationRoutes } from "./routes/specification.route";

import { Database } from './database';

const database = Database.getInstance();
database.init();

const app = express();

app.use(express.json());

app.get('/', (_: Request, response: Response) => {
	return response.json({ message: 'Hello world!' });
});

app.use('/category', categoryRoutes);
app.use('/specifications', specificationRoutes);

app.listen(3333, () => {
	console.log('[server] listening on http://localhost:3333')
});
