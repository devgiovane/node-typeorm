import { User } from "~@Entity/User.entity";
import { ICreateUserDTO, IUserRepository } from "~@Repository/user/IUser.repository";

export class UserMemoryRepository implements IUserRepository {

	private users: Array<User> = [];

	public async save(data: ICreateUserDTO): Promise<void> {
		const user = new User();
		user.name = data.name;
		user.email = data.email;
		user.password = data.password;
		user.driver_license = data.driver_license;
		this.users.push(user);
	}

	public async findById(id: string): Promise<User> {
		return this.users.find(user => user.id === id);
	}

	public async findByEmail(email: string): Promise<User> {
		return this.users.find(user => user.email === email);
	}

}
