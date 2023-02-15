import { Request, Response, Router } from "express";

import { auth } from "~@Middleware/auth.middleware";
import { ListSpecificationController } from "~@Controller/specification/List.controller";
import { CreateSpecificationController } from "~@Controller/specification/Create.controller";

export const specificationRoutes = Router();
specificationRoutes.use(auth);

const listSpecificationController = new ListSpecificationController();
specificationRoutes.get('/', async function (request: Request, response: Response) {
	return await listSpecificationController.handle(request, response);
});

const createSpecificationService = new CreateSpecificationController();
specificationRoutes.post('/', async function (request: Request, response: Response) {
	return await createSpecificationService.handle(request, response);
});
