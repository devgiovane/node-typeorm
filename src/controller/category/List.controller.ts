import { Request, Response } from "express";

import { ListCategoryService } from "../../service/category/List.service";

export class ListCategoryController {

	constructor(
		private readonly listCategoryService: ListCategoryService
	) {
	}

	public async handle(request: Request, response: Response): Promise<Response> {
		try {
			const categories = await this.listCategoryService.execute();
			return response.json(categories);
		} catch (error) {
			return response.status(404).send({ error: error.message });
		}
	}

}
