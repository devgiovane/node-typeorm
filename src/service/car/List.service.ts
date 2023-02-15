import { inject, injectable } from "tsyringe";

import { Car } from "~@Entity/Car.entity";
import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { ICarRepository } from "~@Repository/car/ICar.repository";

interface IRequest {
	name?: string;
	brand?: string;
	category_id?: string;
}

@injectable()
export class ListCarService {

	constructor(
		@inject("CarRepository")
		private readonly carsRepository: ICarRepository
	) {
	}

	public async execute(data: IRequest = {}): Promise<Array<Car>> {
		const cars = await this.carsRepository.findAvailable(data);
		if (cars.length <= 0) {
			throw new AppError('cars not found', StatusError.NOT_FOUND);
		}
		return cars;
	}

}
