import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { AuthService } from "~@Service/auth/Auth.service";

export class AuthController {

	public async handle(request: Request, response: Response) {
		const { email, password } = request.body;
		const authService = container.resolve(AuthService);
		try {
			const token = await authService.execute({ email, password });
			return response.json({ token });
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).send({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
