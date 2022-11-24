import { inject, injectable } from "tsyringe";

import { Category } from "~@Entity/Category.entity";
import { ICategoryRepository } from "~@Repository/category/ICategory.repository";

@injectable()
export class ListCategoryService {

	constructor(
		@inject("CategoryRepository")
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
