import { DataSource } from "typeorm";

export class Database {

	private static _instance: Database;
	private readonly appDataSource: DataSource;

	constructor() {
		this.appDataSource = new DataSource({
			type: "postgres",
			host: process.env.NODE_ENV === "test" ? "localhost" : "database",
			port: 5432,
			username: "docker",
			password: "58516ccd",
			database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
			synchronize: process.env.NODE_ENV !== "test",
			logging: process.env.NODE_ENV !== "test",
			entities: [
				"src/entity/**/*.entity.ts"
			],
			migrations: [
				"src/migration/**/*.migrate.ts"
			],
		});
	}

	public static getInstance(): Database {
		if (!Database._instance) {
			Database._instance = new Database();
		}
		return Database._instance;
	}

	public async init(): Promise<void> {
		await this.appDataSource.initialize();
	}

	public getDataSource(): DataSource {
		return this.appDataSource;
	}

}


