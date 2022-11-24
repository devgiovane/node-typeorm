import { Request, Response, Router } from "express";

import { SpecificationRepository } from "../repository/specification/Specification.repository";
import { CreateSpecificationService } from "../service/specification/Create.service";

const specificationRoutes = Router();
const specificationRegistry = new SpecificationRepository();

specificationRoutes.get('/', (_: Request, response: Response) => {

});

specificationRoutes.post('/', (request: Request, response: Response) => {

});

export { specificationRoutes };
