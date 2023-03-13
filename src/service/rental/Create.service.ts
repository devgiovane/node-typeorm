import { inject, injectable } from "tsyringe";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
import { IDateProvider } from "~@Shared/providers/IDate.provider";
import { IRentalRepository } from "~@Repository/rental/IRental.repository";

interface IRequest {
	user_id: string;
	car_id: string;
	expected_return_date: Date;
}

@injectable()
export class CreateRentalService {

	private static COMPARE_HOURS = 24;

	constructor(
		@inject("RentalRepository")
		private readonly rentalRepository: IRentalRepository,
		@inject("DayjsProvider")
		private readonly dateProvider: IDateProvider
	) {

	}

	public async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<void> {
		const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);
		if (carUnavailable) {
			throw new AppError('car unavailable', StatusError.NOT_FOUND);
		}
		const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);
		if (rentalOpenToUser) {
			throw new AppError('rental opened to user', StatusError.NOT_FOUND);
		}
		const compare = this.dateProvider.compare(this.dateProvider.dateNow(), expected_return_date);
		if (compare < CreateRentalService.COMPARE_HOURS) {
			throw new AppError('invalid return time', StatusError.BAD_REQUEST);
		}
		await this.rentalRepository.save({ user_id, car_id, expected_return_date });
	}

}
