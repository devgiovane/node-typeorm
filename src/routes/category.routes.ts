import { Request, Response, Router } from 'express';

import { auth } from "~@Middleware/auth.middleware";
import { ListCategoryController } from "~@Controller/category/List.controller";
import { CreateCategoryController } from "~@Controller/category/Create.controller";

export const categoryRoutes = Router();
categoryRoutes.use(auth);

const listCategoryController = new ListCategoryController();
categoryRoutes.get('/', async (request: Request, response: Response) => {
	return await listCategoryController.handle(request, response);
});

const createCategoryController = new CreateCategoryController();
categoryRoutes.post('/', async (request: Request, response: Response) => {
	return await createCategoryController.handle(request, response);
});
