import { Request, Response, Router } from "express";

import { CreateCategoryController } from "~@Controller/category/Create.controller";

const specificationRoutes = Router();

specificationRoutes.get('/', (_: Request, response: Response) => {

});

const createSpecificationService = new CreateCategoryController();
specificationRoutes.post('/', async (request: Request, response: Response) => {
	await createSpecificationService.handle(request, response);
});

export { specificationRoutes };
