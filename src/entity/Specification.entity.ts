import * as uuid from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("specification")
export class Specification {

	@PrimaryColumn("uuid")
	public id?: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@CreateDateColumn()
	public created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid.v4()
		}
		this.created_at = new Date();
	}

}
