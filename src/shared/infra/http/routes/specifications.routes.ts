import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/enchureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCase/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCase/listSpecification/ListSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.get("/", listSpecificationsController.handle);


export {specificationsRoutes}