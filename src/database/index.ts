import { DataSource } from "typeorm";

export class Database {

	private static _instance: Database;
	private readonly appDataSource: DataSource;

	constructor() {
		this.appDataSource = new DataSource({
			type: "postgres",
			host: "database",
			port: 5432,
			username: "docker",
			password: "58516ccd",
			database: "rentx",
			synchronize: true,
			logging: false,
			entities: [
				"./src/entity/**/*.ts"
			],
			migrations: [
				"./src/migration/**/*.ts"
			],
		});
	}

	public static getInstance(): Database {
		if (!Database._instance) {
			Database._instance = new Database();
		}
		return Database._instance;
	}

	public init(): void {
		this.appDataSource.initialize()
			.then(() => {
				console.log("[database] has been initialized");
			})
			.catch(error => {
				console.error("[database] ", error);
				throw error;
			});
	}

	public getDataSource(): DataSource {
		return this.appDataSource;
	}

}


