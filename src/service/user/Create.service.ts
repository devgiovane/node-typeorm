import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { UserRepository } from "~@Repository/user/User.repository";

interface IRequest {
	name: string;
	username: string;
	password: string;
	email: string;
	driver_license: string;
}

@injectable()
export class CreateUserService {

	constructor(
		@inject("UserRepository")
		private userRepository: UserRepository
	) {
	}

	public async execute(data: IRequest): Promise<void> {
		const userExists = await this.userRepository.findByEmail(data.email);
		if (userExists) {
			throw new Error('user already exists');
		}
		data.password = await hash(data.password, 8);
		await this.userRepository.save(data);
	}

}
