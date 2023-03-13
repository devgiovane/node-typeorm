import { Rental } from "~@Entity/Rental.entity";

export interface ICreateRentalDTO {
	user_id: string;
	car_id: string;
	expected_return_date: Date
}

export interface IRentalRepository {
	save({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<void>;
	findOpenRentalByCar(car_id: string): Promise<Rental>;
	findOpenRentalByUser(user_id: string): Promise<Rental>;
}
