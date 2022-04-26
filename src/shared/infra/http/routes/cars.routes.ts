import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { Router } from "express";
import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCase/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCase/uploadCarImages/UploadCarImagesController";
import multer from "multer";

const carsRoutes = Router();

const uploadImage = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();

const listAvailableCarsController = new ListAvailableCarsController();

const createCarSpecificationController = new CreateCarSpecificationController();

const uploadCarImagesController = new UploadCarImagesController();


carsRoutes.post("/", 
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.post("/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    uploadImage.array("images"),
    uploadCarImagesController.handle
);

export { carsRoutes }