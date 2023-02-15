import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "~@Error/App.error";
import { StatusError } from "~@Error/Status.error";
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
			throw new AppError('email or password incorrect', StatusError.UNAUTHORIZED);
		}
		const passwordValid = await compare(password, user.password);
		if (!passwordValid) {
			throw new AppError('email or password incorrect', StatusError.UNAUTHORIZED);
		}
		return sign({}, process.env.TOKEN_SALT, {
			expiresIn: process.env.TOKEN_EXPIRE,
			subject: user.id
		});
	}

}
