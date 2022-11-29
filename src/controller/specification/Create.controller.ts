import { container } from "tsyringe";
import { Request, Response } from "express";

import { CreateSpecificationService } from "~@Service/specification/Create.service";

export class CreateSpecificationController {

	public async handle(request: Request, response: Response): Promise<Response> {
		const { name, description } = request.body;
		try {
			const createSpecificationService = container.resolve(CreateSpecificationService);
			await createSpecificationService.execute({ name, description });
			return response.status(201).send();
		} catch (error) {
			return response.status(409).json({error: error.message});
		}
	}

}
