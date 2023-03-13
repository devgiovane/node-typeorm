import "reflect-metadata";
import dayjs from "dayjs";

import { AppError } from "~@Error/App.error";
import { DayjsProvider } from "~@Shared/providers/Dayjs.provider";
import { CreateRentalService } from "~@Service/rental/Create.service";
import { RentalMemoryRepository } from "~@Repository/rental/memory/Rental.repository";

let dayjsProvider: DayjsProvider;
let createRentalService: CreateRentalService;
let rentalMemoryRepository: RentalMemoryRepository;

describe('Create rental service', function () {

	const dayAdd24Hours = dayjs().add(1, "day").toDate();

	beforeEach(function () {
		dayjsProvider = new DayjsProvider();
		rentalMemoryRepository = new RentalMemoryRepository();
		createRentalService = new CreateRentalService(rentalMemoryRepository, dayjsProvider);
	});

	it('should be able to create a new rental', async function () {
		const  newRental = {
			car_id: "1234",
			user_id: "1234",
			expected_return_date: dayAdd24Hours,
		}
		await createRentalService.execute(newRental);
	});

	it('should not be able to create a new rental if there is another open to the same user', async function () {
		const  newRental = {
			car_id: "1234",
			user_id: "1234",
			expected_return_date: dayAdd24Hours,
		}
		await expect(async function () {
			await createRentalService.execute(newRental);
			await createRentalService.execute(newRental);
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create a new rental if there is another open to the same car', async function () {
		const  newRental = {
			car_id: "1234",
			expected_return_date: dayAdd24Hours,
		}
		await expect(async function () {
			await createRentalService.execute({ ...newRental, user_id: "1234" });
			await createRentalService.execute({ ...newRental, user_id: "4321" });
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create a new rental with invalid return time', async function () {
		const  newRental = {
			car_id: "1234",
			expected_return_date: dayjsProvider.dateNow(),
		}
		await expect(async function () {
			await createRentalService.execute({ ...newRental, user_id: "1234" });
		}).rejects.toBeInstanceOf(AppError);
	});
})
