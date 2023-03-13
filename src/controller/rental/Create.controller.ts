import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { IController } from "~@Controller/IController";
import { CreateRentalService } from "~@Service/rental/Create.service";

export class CreateRentalController implements IController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { car_id, expected_return_date } = request.body;
		const { id: user_id } = request.user;
		try {
			const createRentalService = container.resolve(CreateRentalService);
			await createRentalService.execute({ user_id, car_id, expected_return_date });
			return response.status(StatusError.CREATED).send();
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
