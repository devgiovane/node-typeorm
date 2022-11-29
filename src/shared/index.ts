import { container } from "tsyringe";

import { Database } from "../database";

import { ICategoryRepository } from "~@Repository/category/ICategory.repository";
import { CategoryRepository } from "~@Repository/category/Category.repository";
import { ISpecificationRepository } from "~@Repository/specification/ISpecification.repository";
import { SpecificationRepository } from "~@Repository/specification/Specification.repository";
import { IUserRepository } from "~@Repository/user/IUser.repository";
import { UserRepository } from "~@Repository/user/User.repository";

const database = Database.getInstance();
const categoryRepository = new CategoryRepository(database.getDataSource());
const specificationRepository = new SpecificationRepository(database.getDataSource());
const userRepository = new UserRepository(database.getDataSource());

container.registerInstance<ICategoryRepository>(
	"CategoryRepository",
	categoryRepository
);

container.registerInstance<ISpecificationRepository>(
	"SpecificationRepository",
	specificationRepository
);

container.registerInstance<IUserRepository>(
	"UserRepository",
	userRepository
);
