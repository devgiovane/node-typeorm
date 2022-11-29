import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "~@Repository/specification/ISpecification.repository";

interface IRequest {
	name: string,
	description: string
}

@injectable()
export class CreateSpecificationService {

	constructor(
		@inject("SpecificationRepository")
		private readonly specificationRegistry: ISpecificationRepository
	) {
	}

	public async execute({ name, description }: IRequest): Promise<void> {
		const specificationExists = await this.specificationRegistry.findByName(name);
		if (specificationExists) {
			throw new Error("specification already exists!");
		}
		await this.specificationRegistry.save({ name, description });
	}

}
