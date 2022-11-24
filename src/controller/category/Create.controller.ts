import { Request, Response } from "express";

import { CreateCategoryService } from "../../service/category/Create.service";

export class CreateCategoryController {

	constructor(
		private readonly createCategoryService: CreateCategoryService
	) {
	}

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
		try {
			await this.createCategoryService.execute({ name, description });
			return response.status(201).send();
		} catch (error) {
			return response.status(409).json({ error: error.message });
		}
	}

}
