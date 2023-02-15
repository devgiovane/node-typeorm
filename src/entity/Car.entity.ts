import * as uuid from 'uuid';
import { Column, CreateDateColumn, Entity, ManyToOne, JoinTable, JoinColumn, PrimaryColumn, ManyToMany } from "typeorm";

import { Category } from "~@Entity/Category.entity";
import { Specification } from "~@Entity/Specification.entity";

@Entity("car")
export class Car {
	@PrimaryColumn("uuid")
	public id?: string;

	@Column()
	public name: string;

	@Column()
	public description: string;

	@Column()
	public daily_rate: number;

	@Column({ default: true })
	public available: boolean;

	@Column()
	public license_plate: string;

	@Column()
	public fine_amount: number;

	@Column()
	public brand: string;

	@ManyToOne(() => Category, category => category.id, { onDelete: "SET NULL" })
	@JoinColumn({ name: "category_id" })
	public category: Category;

	@Column()
	public category_id: string;

	@ManyToMany(() => Specification, specification => specification.id, { onDelete: "SET NULL" })
	@JoinTable({
		name: "specification_car",
		joinColumns: [{
			name: "car_id"
		}],
		inverseJoinColumns: [{
			name: "specification_id"
		}],
	})
	specifications: Array<Specification>

	@CreateDateColumn()
	public created_at: Date;

	constructor() {
		if (!this.id) {
			this.id = uuid.v4()
		}
		this.available = true;
		this.created_at = new Date();
	}

}
