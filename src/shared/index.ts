import { container } from "tsyringe";

import { Database } from "../database";

import { ICategoryRepository } from "~@Repository/category/ICategory.repository";
import { CategoryRepository } from "~@Repository/category/Category.repository";
import { ISpecificationRepository } from "~@Repository/specification/ISpecification.repository";
import { SpecificationRepository } from "~@Repository/specification/Specification.repository";

const database = Database.getInstance();
const categoryRepository = new CategoryRepository(database.getDataSource());
const specificationRepository = new SpecificationRepository(database.getDataSource());

container.registerInstance<ICategoryRepository>(
	"CategoryRepository",
	categoryRepository
);

container.registerInstance<ISpecificationRepository>(
	"SpecificationRepository",
	specificationRepository
);
