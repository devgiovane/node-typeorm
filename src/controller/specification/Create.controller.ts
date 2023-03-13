import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { CreateSpecificationService } from "~@Service/specification/Create.service";
import { IController } from "~@Controller/IController";

export class CreateSpecificationController  implements IController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
		try {
			const createSpecificationService = container.resolve(CreateSpecificationService);
			await createSpecificationService.execute({ name, description });
			return response.status(StatusError.CREATED).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({error: error.message});
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
