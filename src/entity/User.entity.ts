import * as uuid from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("user")
export class User {
	@PrimaryColumn("uuid")
	public id?: string;

	@Column()
	public name: string;

	@Column({ unique: true })
	public username: string;

	@Column()
	public password: string;

	@Column()
	public email: string;

	@Column()
	public driver_license: string;

	@Column({ default: false })
	public is_admin: boolean;

	@CreateDateColumn()
	public created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid.v4()
		}
		this.created_at = new Date();
	}

}
