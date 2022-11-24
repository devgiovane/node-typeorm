import { Request, Response, Router } from 'express';

import { Database } from "../database";
import { CategoryRepository } from '../repository/category/Category.repository';
import { CreateCategoryService } from "../service/category/Create.service";
import { ListCategoryService } from "../service/category/List.service";
import { CreateCategoryController } from "../controller/category/Create.controller";
import { ListCategoryController } from "../controller/category/List.controller";

const categoryRoutes = Router();
const database = Database.getInstance();
const categoryRepository = new CategoryRepository(database.getDataSource());

const createCategoryService = new CreateCategoryService(categoryRepository);
const createCategoryController = new CreateCategoryController(createCategoryService);

categoryRoutes.get('/', async (request: Request, response: Response) => {
	return await listCategoryController.handle(request, response);
});

const listCategoryService = new ListCategoryService(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryService);

categoryRoutes.post('/', async (request: Request, response: Response) => {
	return await createCategoryController.handle(request, response);
});

export { categoryRoutes };
