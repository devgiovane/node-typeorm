import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { Database } from "~@Database/index";
import { UserRepository } from "~@Repository/user/User.repository";

interface IPayload {
	sub: string;
}

export async function auth(request: Request, response: Response, next: NextFunction) {
	const authorization = request.headers.authorization;
	if (!authorization) {
		throw new Error('token missing');
	}
	const [ type, token ] = authorization.split(' ');
	if (type !== 'Bearer') {
		throw new Error('token type invalid');
	}
	try {
		const { sub } = verify(token, "e3bce3fa76da81e068ac242d2acac391") as IPayload;
		const database  = Database.getInstance();
		const userRepository = new UserRepository(database.getDataSource());
		const user = userRepository.findById(sub);
		if (!user) {
			throw new Error('user not found');
		}
		return next();
	} catch (error) {
		throw new Error('token invalid');
	}
}
