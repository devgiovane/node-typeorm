import { singleton } from "tsyringe";

import { DataSource, Repository } from "typeorm";
import { Specification } from "~@Entity/Specification.entity";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./ISpecification.repository";

@singleton()
export class SpecificationRepository implements ISpecificationRepository {

	private readonly repository: Repository<Specification>;

	constructor(
		private readonly dataSource: DataSource
	) {
		this.repository = this.dataSource.getRepository(Specification);
	}

	public async save({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specification = new Specification();
		specification.name = name;
		specification.description = description;
		await this.repository.save(specification)
	}

	public async findAll(): Promise<Array<Specification>> {
		return await this.repository.find();
	}

	public async findByName(name: string): Promise<Specification> {
		return await this.repository.findOneBy({ name });
	}

}
