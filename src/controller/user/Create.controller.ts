import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { CreateUserService } from "~@Service/user/Create.service";
import { IController } from "~@Controller/IController";

export class CreateUserController implements IController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, username, password, driver_license } = request.body;
		try {
			const createUserService = container.resolve(CreateUserService);
			await createUserService.execute({ name, email, username, password, driver_license });
			return response.status(StatusError.CREATED).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
