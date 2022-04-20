import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/enchureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();

const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/", 
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes }