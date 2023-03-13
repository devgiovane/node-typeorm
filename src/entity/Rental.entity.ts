import * as uuid from 'uuid';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";

import { Car } from "~@Entity/Car.entity";
import { User } from "~@Entity/User.entity";

@Entity("rental")
export class Rental {

	@PrimaryColumn("uuid")
	public id?: string;

	@ManyToOne(() => Car, car => car.id, { onDelete: "CASCADE" })
	@JoinColumn({ name: "car_id" })
	public car: Car;

	@Column()
	public car_id: string;

	@ManyToOne(() => User, user => user.id, { onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	public user: User;

	@Column()
	public user_id: string;

	@Column()
	public start_date: Date;

	@Column({ nullable: true })
	public end_date: Date;

	@Column()
	public expected_return_date: Date;

	@Column({ nullable: true })
	public total: number;

	@CreateDateColumn()
	public created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid.v4()
		}
		this.created_at = new Date();
	}
}
