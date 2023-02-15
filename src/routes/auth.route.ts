import { Request, Response, Router } from "express";

import { AuthController } from "~@Controller/auth/Auth.controller";

export const authRoutes = Router();

const authController = new AuthController();
authRoutes.post('/token', async function (request: Request, response: Response) {
	return await authController.handle(request, response);
});
