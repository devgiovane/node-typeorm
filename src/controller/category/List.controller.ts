import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { ListCategoryService } from "~@Service/category/List.service";

export class ListCategoryController {

	public async handle(request: Request, response: Response): Promise<Response> {
		try {
			const listCategoryService = container.resolve(ListCategoryService);
			const categories = await listCategoryService.execute();
			return response.json(categories);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).send({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message })
		}
	}

}
