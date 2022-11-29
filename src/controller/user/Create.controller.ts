import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateUserService } from "~@Service/user/Create.service";

export class CreateUserController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, email, username, password, driver_license } = request.body;
		try {
			const createUserService = container.resolve(CreateUserService);
			await createUserService.execute({ name, email, username, password, driver_license });
			return response.status(201).send();
		} catch (error) {
			return response.status(409).json({ error: error.message });
		}
	}

}
