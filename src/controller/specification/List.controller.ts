import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { ListSpecificationService } from "~@Service/specification/List.service";
import { IController } from "~@Controller/IController";

export class ListSpecificationController implements IController {

	public async handle(request: Request, response: Response): Promise<Response> {
		try {
			const listSpecificationService = container.resolve(ListSpecificationService);
			const specifications = await listSpecificationService.execute();
			return response.json(specifications);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).send({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
