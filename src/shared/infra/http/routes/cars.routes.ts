import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { Router } from "express";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export { carsRoutes }