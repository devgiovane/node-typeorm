import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { CreateCarService } from "~@Service/car/Create.service";

export class CreateCarController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, description, license_plate, brand, fine_amount, daily_rate, category_id } = request.body;
		try {
			const createCarService = container.resolve(CreateCarService);
			await createCarService.execute({
				name, description, license_plate, brand, fine_amount, daily_rate, category_id
			});
			return response.status(StatusError.CREATED).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
