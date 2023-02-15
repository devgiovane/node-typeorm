import { Car } from "~@Entity/Car.entity";
import { Specification } from "~@Entity/Specification.entity";

export interface ICreateCarDTO {
	name: string;
	description: string;
	daily_rate: number;
	license_plate: string;
	fine_amount: number;
	brand: string;
	category_id: string;
	specifications?: Array<Specification>
}

export interface IListCarDTO {
	name?: string;
	brand?: string;
	category_id?: string;
}

export interface ICarRepository {
	save(data: ICreateCarDTO): Promise<void>;
	findAvailable(data: IListCarDTO): Promise<Array<Car>>;
	findById(id: string): Promise<Car>;
	findByLicensePlate(license_plate): Promise<Car>;
}
