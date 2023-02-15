import { Request, Response, Router } from "express";

import { auth } from "~@Middleware/auth.middleware";
import { admin } from "~@Middleware/admin.middleware";
import { ListCarController } from "~@Controller/car/List.controller";
import { CreateCarController } from "~@Controller/car/Create.controller";
import { CreateCarSpecificationController } from "~@Controller/carSpecification/Create.controller";

export const carRoutes = Router();
carRoutes.use(auth);

const createCarController = new CreateCarController();
carRoutes.post('/', admin, async function(request: Request, response: Response) {
	return await createCarController.handle(request, response);
});

const listCarController = new ListCarController();
carRoutes.get('/', async function (request: Request, response: Response) {
	return await listCarController.handle(request, response);
});

const createCarSpecificationController = new CreateCarSpecificationController();
carRoutes.post('/:car_id/specification', async function (request: Request, response: Response) {
	return await createCarSpecificationController.handle(request, response);
});
