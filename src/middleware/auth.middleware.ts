import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { Database } from "~@Database/index";
import { StatusError } from "~@Error/Status.error";
import { UserRepository } from "~@Repository/user/typeorm/User.repository";

interface IPayload {
	sub: string;
}

export async function auth(request: Request, response: Response, next: NextFunction) {
	const authorization = request.headers.authorization;
	if (!authorization) {
		return response.status(StatusError.UNAUTHORIZED).send({ error: 'token missing' });
	}
	const [ type, token ] = authorization.split(' ');
	if (type !== 'Bearer') {
		return response.status(StatusError.UNAUTHORIZED).send({ error: 'token type invalid' });
	}
	try {
		const { sub } = verify(token, process.env.TOKEN_SALT) as IPayload;
		const database  = Database.getInstance();
		const userRepository = new UserRepository(database.getDataSource());
		const user = await userRepository.findById(sub);
		if (!user) {
			return response.status(StatusError.UNAUTHORIZED).send({ error: 'user not found' });
		}
		request.user = user;
		return next();
	} catch (error) {
		return response.status(StatusError.UNAUTHORIZED).send({ error: 'token invalid' });
	}
}
