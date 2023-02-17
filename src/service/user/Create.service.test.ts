import "reflect-metadata";

import { AppError } from "~@Error/App.error";
import { CreateUserService } from "~@Service/user/Create.service";
import { UserMemoryRepository } from "~@Repository/user/memory/User.repository";

let createUserService: CreateUserService;
let userMemoryRepository: UserMemoryRepository;

describe('Create user service', function () {

	beforeEach(function () {
		userMemoryRepository = new UserMemoryRepository();
		createUserService = new CreateUserService(userMemoryRepository);
	});

	it('should be able to create user', async function () {
		const newUser = {
			name: 'User test',
			email: 'user@test.com',
			password: '123456',
			username: 'user.test',
			driver_license: 'AB'
		};
		await createUserService.execute(newUser);
		const user = await userMemoryRepository.findByEmail(newUser.email);
		expect(newUser.email).toEqual(user.email);
	});

	it('should not be able to create user existent', async function () {
		const newUser = {
			name: 'User test',
			email: 'user@test.com',
			password: '123456',
			username: 'user.test',
			driver_license: 'AB'
		};
		await expect(async function () {
			await createUserService.execute(newUser);
			await createUserService.execute(newUser);
		}).rejects.toBeInstanceOf(AppError);
	});

});
