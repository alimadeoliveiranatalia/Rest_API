import { Router } from "express";
import { CreateSpecificationController } from "../modules/cars/useCase/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCase/listSpecification/ListSpecificationController";


const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", listSpecificationsController.handle);


export {specificationsRoutes}