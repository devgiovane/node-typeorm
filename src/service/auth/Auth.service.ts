import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "~@Repository/user/IUser.repository";

interface IRequest {
	email: string;
	password: string;
}

@injectable()
export class AuthService {

	constructor(
		@inject("UserRepository")
		private readonly userRepository: IUserRepository
	) {
	}

	public async execute({email, password}: IRequest) {
		const user = await this.userRepository.findByEmail(email);
		if (!user) {
			throw new Error('email or password incorrect');
		}
		const passwordValid = compare(password, user.password);
		if (!passwordValid) {
			throw new Error('email or password incorrect');
		}
		return sign({}, "e3bce3fa76da81e068ac242d2acac391", {
			subject: user.id,
			expiresIn: "1d"
		});
	}

}
