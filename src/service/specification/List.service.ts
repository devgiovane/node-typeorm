import { inject, injectable } from "tsyringe";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
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
			throw new AppError('specifications not found', StatusError.NOT_FOUND);
		}
		return specifications;
	}

}
