import { injectable, inject } from "tsyringe";

import { ICategoryRepository } from "~@Repository/category/ICategory.repository";

interface IRequest {
	name: string,
	description: string
}

@injectable()
export class CreateCategoryService {

	constructor(
		@inject("CategoryRepository")
		private readonly categoryRepository: ICategoryRepository
	) {
	}

	public async execute({ name, description }: IRequest): Promise<void> {
		const categoryExists = await this.categoryRepository.findByName(name);
		if (categoryExists) {
			throw new Error("category already exists!");
		}
		await this.categoryRepository.save({ name, description });
	}

}
