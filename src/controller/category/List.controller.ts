import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListCategoryService } from "~@Service/category/List.service";

export class ListCategoryController {

	public async handle(request: Request, response: Response): Promise<Response> {
		try {
			const listCategoryService = container.resolve(ListCategoryService);
			const categories = await listCategoryService.execute();
			return response.json(categories);
		} catch (error) {
			return response.status(404).send({ error: error.message });
		}
	}

}
