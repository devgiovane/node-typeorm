import { Specification } from "../../entity/Specification.entity";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./ISpecification.repository";

export class SpecificationRepository implements ISpecificationRepository {

	private readonly specifications: Array<Specification>;

	public save({name, description}: ICreateSpecificationDTO): void {
		const specification = new Specification();
		Object.assign(specification, {
			name,
			description,
			created_at: new Date()
		});
		this.specifications.push(specification);
	}

	public findByName(name: string): Specification {
		return this.specifications.find(specification => specification.name === name);
	}

}
