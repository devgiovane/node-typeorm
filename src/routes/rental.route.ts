import { Request, Response, Router } from "express";
import { CreateRentalController } from "~@Controller/rental/Create.controller";

export const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
rentalRoutes.post('/', async function (request: Request, response: Response) {
	return await createRentalController.handle(request, response);
});
