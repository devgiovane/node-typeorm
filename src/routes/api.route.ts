import { Router } from "express";

import { categoryRoutes } from "~@Routes/category.routes";
import { specificationRoutes } from "~@Routes/specification.route";
import { userRoutes } from "~@Routes/user.route";
import { carRoutes } from "~@Routes/car.route";
import { rentalRoutes } from "~@Routes/rental.route";

export const apiRoutes = Router();

apiRoutes.use('/category', categoryRoutes);
apiRoutes.use('/specification', specificationRoutes);
apiRoutes.use('/user', userRoutes);
apiRoutes.use('/car', carRoutes);
apiRoutes.use('/rental', rentalRoutes);
