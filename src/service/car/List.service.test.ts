import "reflect-metadata";

import { ListCarService } from "~@Service/car/List.service";
import { CarMemoryRepository } from "~@Repository/car/memory/Car.repository";

let listCarService: ListCarService;
let carMemoryRepository: CarMemoryRepository;

describe('List car services', function() {

	beforeEach(function () {
		carMemoryRepository = new CarMemoryRepository();
		listCarService = new ListCarService(carMemoryRepository);
	})

	it('should be able to list all available cars', async function() {
		const newCar = {
			name: "Car 1",
			description: "Test description",
			license_plate: "ABC1234",
			brand: "Car",
			fine_amount: 100,
			daily_rate: 140,
			category_id: "category_id"
		};
		await carMemoryRepository.save(newCar);
		const cars = await listCarService.execute();
		const car = await carMemoryRepository.findByLicensePlate(newCar.license_plate)
		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by name', async function () {
		const newCar = {
			name: "Car 1",
			description: "Test description",
			license_plate: "ABC1234",
			brand: "Car",
			fine_amount: 100,
			daily_rate: 140,
			category_id: "category_id"
		};
		await carMemoryRepository.save(newCar);
		const cars = await listCarService.execute({
			name: "Car 1"
		});
		const car = await carMemoryRepository.findByLicensePlate(newCar.license_plate)
		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by brand', async function () {
		const newCar = {
			name: "Car 1",
			description: "Test description",
			license_plate: "ABC1234",
			brand: "Car",
			fine_amount: 100,
			daily_rate: 140,
			category_id: "category_id"
		};
		await carMemoryRepository.save(newCar);
		const cars = await listCarService.execute({
			brand: "Car"
		});
		const car = await carMemoryRepository.findByLicensePlate(newCar.license_plate)
		expect(cars).toEqual([car]);
	});

});
