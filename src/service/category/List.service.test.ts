import "reflect-metadata";

import { ListCategoryService } from "~@Service/category/List.service";
import { CategoryMemoryRepository } from "~@Repository/category/memory/Category.repository";

let listCategoryService: ListCategoryService;
let categoryMemoryRepository: CategoryMemoryRepository;

describe('List categories service', function () {

	beforeEach(function () {
		categoryMemoryRepository = new CategoryMemoryRepository();
		listCategoryService = new ListCategoryService(categoryMemoryRepository);
	});

	it('should be able to list all category', async function () {
		const newCategory = {
			name: "Category 1",
			description: "Test description"
		};
		await categoryMemoryRepository.save(newCategory);
		const categories = await listCategoryService.execute();
		const category = await categoryMemoryRepository.findByName(newCategory.name);
		expect(categories).toEqual([category]);
	});

});
