import { container } from "tsyringe";
import { Request, Response } from "express";

import { ListSpecificationService } from "~@Service/specification/List.service";

export class ListSpecificationController {

	public async handle(request: Request, response: Response): Promise<Response> {
		try {
			const listSpecificationService = container.resolve(ListSpecificationService);
			const specifications = await listSpecificationService.execute();
			return response.json(specifications);
		} catch (error) {
			return response.status(404).send({ error: error.message });
		}
	}

}
