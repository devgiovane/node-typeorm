import { container } from "tsyringe";
import { Request, Response } from "express";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { ListCarService } from "~@Service/car/List.service";

export class ListCarController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, brand, category_id } = request.query;
		try {
			const listCarService = container.resolve(ListCarService);
			const cars = await listCarService.execute({
				name: name as string,
				brand: brand as string,
				category_id: category_id as string
			});
			return response.json(cars);
		} catch (error) {
			if (error instanceof AppError) {
				return response.status(error.statusCode).json({ error: error.message });
			}
			return response.status(StatusError.INTERNAL_ERROR).send({ error: error.message });
		}
	}

}
