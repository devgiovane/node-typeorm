import { DataSource, Repository } from "typeorm";

import { Rental } from "~@Entity/Rental.entity";
import { ICreateRentalDTO, IRentalRepository } from "~@Repository/rental/IRental.repository";

export class RentalRepository implements IRentalRepository {

	private readonly repository: Repository<Rental>;

	constructor(
		private readonly dataSource: DataSource
	) {
		this.repository = dataSource.getRepository(Rental);
	}

	public async findOpenRentalByCar(car_id: string): Promise<Rental> {
		return await this.repository.findOneBy({ car_id });
	}

	public async findOpenRentalByUser(user_id: string): Promise<Rental> {
		return await this.repository.findOneBy({ user_id });
	}

	public async save({user_id, car_id, expected_return_date}: ICreateRentalDTO): Promise<void> {
		const rental = new Rental();
		rental.user_id = user_id;
		rental.car_id = car_id;
		rental.expected_return_date = expected_return_date;
		await this.repository.save(rental);
	}

}
