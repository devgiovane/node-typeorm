import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateCategoryService } from "~@Service/category/Create.service";

export class CreateCategoryController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
		try {
			const createCategoryService = container.resolve(CreateCategoryService);
			await createCategoryService.execute({ name, description });
			return response.status(201).send();
		} catch (error) {
			return response.status(409).json({ error: error.message });
		}
	}

}
