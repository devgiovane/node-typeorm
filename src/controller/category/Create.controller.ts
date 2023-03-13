import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { CreateCategoryService } from "~@Service/category/Create.service";
import { IController } from "~@Controller/IController";

export class CreateCategoryController implements IController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
		try {
			const createCategoryService = container.resolve(CreateCategoryService);
			await createCategoryService.execute({ name, description });
			return response.status(StatusError.CREATED).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
