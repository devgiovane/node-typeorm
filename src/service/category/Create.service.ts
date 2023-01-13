import { injectable, inject } from "tsyringe";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
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
			throw new AppError("category already exists!", StatusError.CONFLICT);
		}
		await this.categoryRepository.save({ name, description });
	}

}
