import { NextFunction, Request, Response } from "express";

import { StatusError } from "~@Error/Status.error";

export async function admin(request: Request, response: Response, next: NextFunction) {
	const { user } = request;
	if (!user.is_admin) {
		return response.status(StatusError.UNAUTHORIZED).send({ error: "user isn't admin" });
	}
	return next();
}
