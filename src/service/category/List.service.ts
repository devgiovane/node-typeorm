import { Category } from "../../entity/Category.entity";
import { ICategoryRepository } from "../../repository/category/ICategory.repository";

export class ListCategoryService {

	constructor(
		private readonly categoryRepository: ICategoryRepository
	) {
	}

	public async execute(): Promise<Array<Category>> {
		const categories = await this.categoryRepository.findAll();
		if (!categories.length) {
			throw new Error('categories not found');
		}
		return categories;
	}

}
