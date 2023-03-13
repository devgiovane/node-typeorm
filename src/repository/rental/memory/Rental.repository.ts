import { Rental } from "~@Entity/Rental.entity";
import { ICreateRentalDTO, IRentalRepository } from "~@Repository/rental/IRental.repository";

export class RentalMemoryRepository implements IRentalRepository {

	private rentals: Array<Rental> = [];

	public async save({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<void> {
		const rental = new Rental();
		rental.user_id = user_id;
		rental.car_id = car_id;
		rental.expected_return_date = expected_return_date;
		rental.start_date = new Date();
		this.rentals.push(rental);
	}

	public async findOpenRentalByCar(car_id: string): Promise<Rental> {
		return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
	}

	public async findOpenRentalByUser(user_id: string): Promise<Rental> {
		return this.rentals.find(rental => rental.car_id === user_id && !rental.end_date);
	}

}
