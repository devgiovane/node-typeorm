import { Category } from "~@Entity/Category.entity";
import { ICategoryRepository, ICreateCategoryDTO } from "~@Repository/category/ICategory.repository";

export class CategoryMemoryRepository implements ICategoryRepository {

	private categories: Array<Category> = [];

	public async save({name, description}: ICreateCategoryDTO): Promise<void> {
		const category = new Category();
		category.name = name;
		category.description = description;
		this.categories.push(category);
	}

	public async findAll(): Promise<Array<Category>> {
		return this.categories;
	}

	public async findByName(name: string): Promise<Category> {
		return this.categories.find(category => category.name === name);
	}

}
