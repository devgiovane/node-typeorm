import "reflect-metadata";

import { AppError } from "~@Error/App.error";
import { CarMemoryRepository } from "~@Repository/car/memory/Car.repository";
import { CreateCarSpecificationService } from "~@Service/carSpecification/Create.service";
import { SpecificationMemoryRepository } from "~@Repository/specification/memory/Specification.repository";

let carMemoryRepository: CarMemoryRepository;
let specificationMemoryRepository: SpecificationMemoryRepository;
let createCarSpecificationService: CreateCarSpecificationService;

describe("Create car specification service", function () {

	beforeEach(function () {
		carMemoryRepository = new CarMemoryRepository();
		specificationMemoryRepository = new SpecificationMemoryRepository();
		createCarSpecificationService = new CreateCarSpecificationService(carMemoryRepository, specificationMemoryRepository);
	});

	it('should not be able to add a new specification to the not existent car', async function () {
		await expect(async function () {
			await createCarSpecificationService.execute({
				car_id: "1234",
				specification_id: [ "54321" ]
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to add a new specification to the car', async function () {
		const newCar = {
			name: 'Name car',
			description: 'Description car',
			daily_rate: 100,
			license_plate: 'ABC1234',
			fine_amount: 60,
			brand: 'Brand',
			category_id: 'category'
		};
		await carMemoryRepository.save(newCar);
		const newSpecification = {
			name: 'Name specification',
			description: 'Description specification',
		}
		await specificationMemoryRepository.save(newSpecification);
		let car = await carMemoryRepository.findByLicensePlate(newCar.license_plate);
		const specification = await specificationMemoryRepository.findByName(newSpecification.name);
		await createCarSpecificationService.execute({
			car_id: car.id,
			specification_id: [ specification.id ]
		});
		car = await carMemoryRepository.findByLicensePlate(newCar.license_plate);
		expect(car.specifications).toEqual([ specification ]);
	});

});
