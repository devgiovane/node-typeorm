import "reflect-metadata";

import { AppError } from "~@Error/App.error";
import { CreateCategoryService } from "~@Service/category/Create.service";
import { CategoryMemoryRepository } from "~@Repository/category/memory/Category.repository";

let createCategoryService: CreateCategoryService;
let categoryMemoryRepository: CategoryMemoryRepository;

describe('Create category service', function () {

	beforeAll(function () {
		categoryMemoryRepository = new CategoryMemoryRepository();
		createCategoryService = new CreateCategoryService(categoryMemoryRepository);
	});

	it('should be able to create a new category', async function () {
		const newCategory = {
			name: 'Sedan',
			description: 'Sedan'
		}
		await createCategoryService.execute(newCategory);
		const category = await categoryMemoryRepository.findByName(newCategory.name);
		expect(category).toHaveProperty('id');
		expect(category.name).toBe(newCategory.name);
	});

	it('should not be able to create a new category with conflict', async function () {
		const newCategory = {
			name: 'Sedan',
			description: 'Sedan'
		}
		await expect(async function () {
			await createCategoryService.execute(newCategory);
			await createCategoryService.execute(newCategory);
		}).rejects.toBeInstanceOf(AppError);
	});

});
