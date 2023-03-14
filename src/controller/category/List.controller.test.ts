import request from "supertest";
import { hash } from "bcrypt";
import * as uuid from "uuid";
import { DataSource } from "typeorm";

import { app } from "../../app";
import { Database } from "~@Database/index";

let datasource: DataSource;
const database = Database.getInstance();

describe('List Category Controller', function () {

	beforeAll(async function () {
		try {
			await database.init();
			datasource = database.getDataSource();
			await datasource.synchronize();
			const password = await hash('kgb8y2kk', 8);
			await datasource.query(`
				INSERT INTO "user" (id, name, username, password, email, driver_license, is_admin, created_at)
				VALUES ('${uuid.v4()}', 'Giovane Silva', 'giovane.silva', '${password}', 'giovanesantos1999@gmail.com', 'AB', true, 'now()');
			`);
		} catch (error) {
			console.log("[database] ", error);
		}
	});

	afterAll(async function () {
		await datasource.dropDatabase();
		await datasource.destroy();
	});

	it('should be able list category', async function () {
		const responseToken = await request(app)
			.post("/auth/v1/token")
			.send({
				email: "giovanesantos1999@gmail.com",
				password: "kgb8y2kk"
			});
		const { token } = responseToken.body;
		await request(app)
			.post("/api/v1/category")
			.send({
				name: 'Category Integration',
				description: 'Category Integration'
			})
			.set({
				Authorization: `Bearer ${token}`
			});
		const response = await request(app)
			.get("/api/v1/category")
			.set({
				Authorization: `Bearer ${token}`
			});
		expect(response.status).toBe(200);
		expect(response.body.length).toBe(1);
	});

});
