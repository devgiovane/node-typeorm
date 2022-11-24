import { Specification } from "~@Entity/Specification.entity";

export interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

export interface ISpecificationRepository {
	findByName(name: string): Promise<Specification>;
	findAll(): Promise<Array<Specification>>;
	save({ name, description }: ICreateSpecificationDTO): Promise<void>;
}
