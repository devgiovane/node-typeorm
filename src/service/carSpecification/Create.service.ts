import { inject, injectable } from "tsyringe";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { ICarRepository } from "~@Repository/car/ICar.repository";
import { ISpecificationRepository } from "~@Repository/specification/ISpecification.repository";

interface IRequest {
	car_id: string;
	specification_id: Array<string>;
}

@injectable()
export class CreateCarSpecificationService {

	constructor(
		@inject("CarRepository")
		private readonly carsRepository: ICarRepository,
		@inject("SpecificationRepository")
		private readonly specificationRepository: ISpecificationRepository
	) {
	}

	public async execute({ car_id, specification_id }: IRequest): Promise<void> {
		const carExists = await this.carsRepository.findById(car_id);
		if (!carExists) {
			throw new AppError('car not exists!', StatusError.NOT_FOUND);
		}
		carExists.specifications = await this.specificationRepository.findByIds(specification_id);
		await this.carsRepository.save(carExists);
	}

}
