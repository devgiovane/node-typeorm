import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
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
			throw new AppError('user already exists', StatusError.CONFLICT);
		}
		data.password = await hash(data.password, 8);
		await this.userRepository.save(data);
	}

}
