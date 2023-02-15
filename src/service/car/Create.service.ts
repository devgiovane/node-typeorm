import { inject, injectable } from "tsyringe";

import { ICarRepository } from "~@Repository/car/ICar.repository";
import {AppError} from "~@Error/App.error";
import {StatusError} from "~@Error/Status.error";

interface IRequest {
	name: string;
	description: string;
	daily_rate: number;
	license_plate: string;
	fine_amount: number;
	brand: string;
	category_id: string;
}

@injectable()
export class CreateCarService {

	constructor(
		@inject("CarRepository")
		private readonly carsRepository: ICarRepository
	) {
	}

	async execute(data: IRequest): Promise<void> {
		const carExists = await this.carsRepository.findByLicensePlate(data.license_plate);
		if (carExists) {
			throw new AppError('car already exists!', StatusError.CONFLICT);
		}
		await this.carsRepository.save(data);
	}

}
