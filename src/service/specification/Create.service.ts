import { ISpecificationRepository } from "../../repository/specification/ISpecification.repository";

interface IRequest {
	name: string,
	description: string
}

export class CreateSpecificationService {

	constructor(
		private readonly specificationRegistry: ISpecificationRepository
	) {
	}


	public execute({ name, description }: IRequest): void {
		const specificationExists = this.specificationRegistry.findByName(name);
		if (specificationExists) {
			throw new Error("specification already exists!");
		}
		this.specificationRegistry.save({ name, description });
	}

}
