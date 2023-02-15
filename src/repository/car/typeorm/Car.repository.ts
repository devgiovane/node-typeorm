import { singleton } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import { Car } from "~@Entity/Car.entity";
import { ICarRepository, ICreateCarDTO, IListCarDTO } from "~@Repository/car/ICar.repository";

@singleton()
export class CarRepository implements ICarRepository {

	private readonly repository: Repository<Car>;

	constructor(
		private readonly dataSource: DataSource
	) {
		this.repository = this.dataSource.getRepository(Car);
	}

	public async save(data: ICreateCarDTO): Promise<void> {
		const car = new Car();
		car.name = data.name;
		car.description = data.description;
		car.daily_rate = data.daily_rate;
		car.license_plate = data.license_plate;
		car.fine_amount = data.fine_amount;
		car.brand = data.brand;
		car.category_id = data.category_id;
		car.specifications = data.specifications;
		await this.repository.save(car);
	}

	public async findAvailable({ name, brand, category_id }: IListCarDTO): Promise<Array<Car>> {
		const carsQuery = await this.repository.createQueryBuilder("c")
			.where("c.available = :available", { available: true });
		if (name) {
			carsQuery.andWhere("c.name = :name", { name });
		}
		if (brand) {
			carsQuery.andWhere("c.brand = :brand", { brand });
		}
		if (category_id) {
			carsQuery.andWhere("c.category_id = :category_id", { category_id });
		}
		return await carsQuery.getMany();
	}

	public async findById(id:string): Promise<Car> {
		return await this.repository.findOneBy({ id });
	}

	public async findByLicensePlate(license_plate): Promise<Car> {
		return await this.repository.findOneBy({ license_plate });
	}

}
