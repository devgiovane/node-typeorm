import "reflect-metadata";

import { AppError } from "~@Error/App.error";
import { AuthService } from "~@Service/auth/Auth.service";
import { CreateUserService } from "~@Service/user/Create.service";
import { ICreateUserDTO } from "~@Repository/user/IUser.repository";
import { UserMemoryRepository } from "~@Repository/user/memory/User.repository";

let authService: AuthService;
let createUserService: CreateUserService;
let userMemoryRepository: UserMemoryRepository;

describe('Authenticate', function () {

	beforeAll(function () {
		userMemoryRepository = new UserMemoryRepository();
		authService = new AuthService(userMemoryRepository);
		createUserService = new CreateUserService(userMemoryRepository);
	});

	it('should be able to authenticate user', async function () {
		const user: ICreateUserDTO = {
			driver_license: "AB",
			email: "user@test.com",
			password: "123456",
			name: "User Test",
			username: "user.test"
		};
		await createUserService.execute(user);
		const result = await authService.execute({
			email: user.email,
			password: "123456"
		});
		expect(result).not.toBeNull();
	});

	it('should not be able to authenticate nonexistent user', function () {
		expect(async function () {
			await authService.execute({
				email: "false@test.com",
				password: "false"
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with incorrect password', async function () {
		const user: ICreateUserDTO = {
			driver_license: "AB",
			email: "user@incorrect.com",
			password: "123456",
			name: "User Incorrect",
			username: "user.incorrect"
		};
		await createUserService.execute(user);
		await expect(async function () {
			await authService.execute({
				email: user.email,
				password: "false"
			});
		}).rejects.toBeInstanceOf(AppError);
	});

});
