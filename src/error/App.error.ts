import { StatusError } from "~@Error/Status.error";

export class AppError extends Error {

	constructor(
		public readonly message: string,
		public readonly statusCode: number = StatusError.BAD_REQUEST
	) {
		super(message);
		this.name = 'AppError';
	}

}
