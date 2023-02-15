import "reflect-metadata";

import { AppError } from "~@Error/App.error";
import { CreateCarService } from "~@Service/car/Create.service";
import { CarMemoryRepository } from "~@Repository/car/memory/Car.repository";

let createCarService: CreateCarService;
let carMemoryRepository: CarMemoryRepository;

describe('Create car service', function () {

	beforeEach(function () {
		carMemoryRepository = new CarMemoryRepository();
		createCarService = new CreateCarService(carMemoryRepository);
	});

	it('should be able to create a new car', async function () {
		const newCar = {
			name: 'Name car',
			description: 'Description car',
			daily_rate: 100,
			license_plate: 'ABC1234',
			fine_amount: 60,
			brand: 'Brand',
			category_id: 'category'
		};
		await createCarService.execute(newCar);
		const car = await carMemoryRepository.findByLicensePlate(newCar.license_plate);
		expect(car).toHaveProperty('id');
		expect(car.license_plate).toBe(newCar.license_plate);
	});

	it('should be able to create a new car with available true', async function () {
		const newCar = {
			name: 'Name car',
			description: 'Description car',
			daily_rate: 100,
			license_plate: 'ABC1234',
			fine_amount: 60,
			brand: 'Brand',
			category_id: 'category'
		};
		await createCarService.execute(newCar);
		const car = await carMemoryRepository.findByLicensePlate(newCar.license_plate);
		expect(car.available).toBeTruthy();
	});

	it('should not be able to create a new car with exists license plate', async function () {
		const newCar = {
			name: 'Name car',
			description: 'Description car',
			daily_rate: 100,
			license_plate: 'ABC1234',
			fine_amount: 60,
			brand: 'Brand',
			category_id: 'category'
		}
		await expect(async function () {
			await createCarService.execute(newCar);
			await createCarService.execute(newCar);
		}).rejects.toBeInstanceOf(AppError);
	});

});
