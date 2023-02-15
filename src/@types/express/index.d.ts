import { User } from "~@Entity/User.entity";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
