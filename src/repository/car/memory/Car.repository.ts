import { Car } from "~@Entity/Car.entity";
import { ICarRepository, ICreateCarDTO, IListCarDTO } from "~@Repository/car/ICar.repository";

export class CarMemoryRepository implements ICarRepository {

	private cars: Array<Car> = [];

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
		this.cars.push(car);
	}

	public async findAvailable({name, brand, category_id}: IListCarDTO): Promise<Array<Car>> {
		return this.cars
			.filter(car => {
				if (
					car.available ||
					((name && car.name === name) ||
					(brand && car.brand === brand) ||
					(category_id && car.category_id === category_id))
				) {
					return car;
				}
				return null;
			});
	}

	public async findById(id:string): Promise<Car> {
		return this.cars.find(car => car.id === id);
	}

	public async findByLicensePlate(license_plate): Promise<Car> {
		return this.cars.find(car => car.license_plate === license_plate);
	}

}
