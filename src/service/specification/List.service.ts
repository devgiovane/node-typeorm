import { inject, injectable } from "tsyringe";

import { Specification } from "~@Entity/Specification.entity";
import { ISpecificationRepository } from "~@Repository/specification/ISpecification.repository";

@injectable()
export class ListSpecificationService {

	constructor(
		@inject("SpecificationRepository")
		private readonly specificationRepository: ISpecificationRepository
	) {
	}

	public async execute(): Promise<Array<Specification>> {
		const specifications = await this.specificationRepository.findAll();
		if (!specifications.length) {
			throw new Error('specifications not found');
		}
		return specifications;
	}

}
