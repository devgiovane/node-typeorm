import { Request, Response, Router } from "express";
import { CreateUserController } from "~@Controller/user/Create.controller";

export const userRoutes = Router();

const createUserController = new CreateUserController();
userRoutes.post('/', async (request: Request, response: Response) => {
	return await createUserController.handle(request, response);
});
