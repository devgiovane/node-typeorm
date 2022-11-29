import {container} from "tsyringe";
import {Request, Response} from "express";

import {AuthService} from "~@Service/auth/Auth.service";

export class AuthController {

	public async handle(request: Request, response: Response) {
		const { email, password } = request.body;
		const authService = container.resolve(AuthService);
		try {
			const token = await authService.execute({ email, password });
			return response.json({ token });
		} catch (error) {
			return response.status(401).send({ error: error.message });
		}
	}

}
