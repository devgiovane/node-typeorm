import { Request, Response, Router } from "express";

import { CreateCategoryController } from "~@Controller/category/Create.controller";
import { ListSpecificationController } from "~@Controller/specification/List.controller";

export const specificationRoutes = Router();

const listSpecificationController = new ListSpecificationController();
specificationRoutes.get('/', async (request: Request, response: Response) => {
	return await listSpecificationController.handle(request, response);
});

const createSpecificationService = new CreateCategoryController();
specificationRoutes.post('/', async (request: Request, response: Response) => {
	return await createSpecificationService.handle(request, response);
});
