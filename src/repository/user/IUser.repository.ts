import { User } from "~@Entity/User.entity";

export interface ICreateUserDTO {
	name: string;
	username: string;
	password: string;
	email: string;
	driver_license: string;
}

export interface IUserRepository {
	save(data: ICreateUserDTO): Promise<void>;
	findById(id: string): Promise<User>;
	findByEmail(email: string): Promise<User>;
}
