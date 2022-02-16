import { Router } from "express";
import { CategoriesRepository } from "../modules/cars/repositories/CategoriesRepository";
import { createCategoryController } from "../modules/cars/useCase/createCategory";
import { listCategoriesController } from "../modules/cars/useCase/listCategory";




const categoriesRoutes = Router();


categoriesRoutes.post("/", (req,res)=> {
    return createCategoryController.handle(req,res);
});
categoriesRoutes.get("/",(req,res)=>{
    return listCategoriesController.handle(req,res);
});

export { categoriesRoutes };