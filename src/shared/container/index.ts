import "~@Shared/providers";

import { container } from "tsyringe";

import { Database } from "~@Database/index";

import { ICategoryRepository } from "~@Repository/category/ICategory.repository";
import { CategoryRepository } from "~@Repository/category/typeorm/Category.repository";
import { ISpecificationRepository } from "~@Repository/specification/ISpecification.repository";
import { SpecificationRepository } from "~@Repository/specification/typeorm/Specification.repository";
import { IUserRepository } from "~@Repository/user/IUser.repository";
import { IRentalRepository } from "~@Repository/rental/IRental.repository";
import { UserRepository } from "~@Repository/user/typeorm/User.repository";
import { ICarRepository } from "~@Repository/car/ICar.repository";
import { CarRepository } from "~@Repository/car/typeorm/Car.repository";
import { RentalRepository } from "~@Repository/rental/typeorm/Rental.repository";

const database = Database.getInstance();
const datasource = database.getDataSource();
const categoryRepository = new CategoryRepository(datasource);
const specificationRepository = new SpecificationRepository(datasource);
const userRepository = new UserRepository(datasource);
const carRepository = new CarRepository(datasource);
const rentalRepository = new RentalRepository(datasource);

container.registerInstance<ICategoryRepository>(
	"CategoryRepository", categoryRepository
);

container.registerInstance<ISpecificationRepository>(
	"SpecificationRepository", specificationRepository
);

container.registerInstance<IUserRepository>(
	"UserRepository", userRepository
);

container.registerInstance<ICarRepository>(
	"CarRepository", carRepository
);

container.registerInstance<IRentalRepository>(
	"RentalRepository", rentalRepository
);
