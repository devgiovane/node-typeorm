import { Specification } from "~@Entity/Specification.entity";
import { ICreateSpecificationDTO, ISpecificationRepository } from "~@Repository/specification/ISpecification.repository";

export class SpecificationMemoryRepository implements ISpecificationRepository {

	private specifications: Array<Specification> = [];

	public async save({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specification = new Specification();
		specification.name = name;
		specification.description = description;
		this.specifications.push(specification);
	}

	public async findAll(): Promise<Array<Specification>> {
		return this.specifications;
	}

	public async findByIds(ids: Array<string>): Promise<Array<Specification>> {
		return this.specifications.filter(specification =>
			ids.includes(specification.id)
		);
	}

	public async findByName(name: string): Promise<Specification> {
		return this.specifications.find(specification => specification.name === name);
	}

}
