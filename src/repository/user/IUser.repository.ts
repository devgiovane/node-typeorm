export interface ICreateUserDTO {
	name: string;
	username: string;
	password: string;
	email: string;
	driver_license: string;
}

export interface IUserRepository {
	save(data: ICreateUserDTO): Promise<void>;
}
