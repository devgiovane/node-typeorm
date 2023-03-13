import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { CreateCarSpecificationService } from "~@Service/carSpecification/Create.service";
import { IController } from "~@Controller/IController";

export class CreateCarSpecificationController implements IController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { car_id } = request.params;
		const { specification_id } = request.body;
		try {
			const createCarSpecificationService = container.resolve(CreateCarSpecificationService);
			await createCarSpecificationService.execute({ car_id, specification_id });
			return response.status(StatusError.CREATED).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
