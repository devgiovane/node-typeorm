import { Category } from "../../entity/Category.entity";

export interface ICreateCategoryDTO {
	name: string;
	description: string;
}

export interface ICategoryRepository {
	findByName(name: string): Promise<Category>;
	findAll(): Promise<Array<Category>>;
	save({ name, description}: ICreateCategoryDTO): Promise<void>;
}
