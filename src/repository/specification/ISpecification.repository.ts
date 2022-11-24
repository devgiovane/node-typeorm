import { Specification } from "../../entity/Specification.entity";

export interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

export interface ISpecificationRepository {
	findByName(name: string): Specification;
	save({ name, description }: ICreateSpecificationDTO):  void;
}
