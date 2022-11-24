import { DataSource, Repository } from "typeorm";

import { Category } from "../../entity/Category.entity";
import { ICategoryRepository, ICreateCategoryDTO } from "./ICategory.repository";

export class CategoryRepository implements ICategoryRepository {

	private readonly repository: Repository<Category>;

	constructor(
		private readonly dataSource: DataSource
	) {
		this.repository = dataSource.getRepository(Category);
	}

	public async save({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = new Category();
		category.name = name;
		category.description = description;
		await this.repository.save(category);
	}

	public async findAll(): Promise<Array<Category>> {
		return await this.repository.find();
	}

	public async findByName(name: string): Promise<Category> {
		return await this.repository.findOneBy({ name });
	}
	
}
