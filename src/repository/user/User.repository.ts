import { singleton } from "tsyringe";
import { DataSource, Repository } from "typeorm";

import { User } from "~@Entity/User.entity";
import { ICreateUserDTO, IUserRepository } from "~@Repository/user/IUser.repository";

@singleton()
export class UserRepository implements IUserRepository {

	private readonly repository: Repository<User>;

	constructor(
		private readonly dataSource: DataSource
	) {
		this.repository = this.dataSource.getRepository(User);
	}

	public async save(data: ICreateUserDTO): Promise<void> {
		const user = new User();
		user.name = data.name;
		user.email = data.email;
		user.username = data.username;
		user.password = data.password;
		user.driver_license = data.driver_license;
		await this.repository.save(user);
	}

}
