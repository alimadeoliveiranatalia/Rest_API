import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationsController {
    async handle(req: Request, res: Response): Promise<Response>{
        const listSpecificationsUseCase = container.resolve(ListSpecificationUseCase);

        const specifications = await listSpecificationsUseCase.execute();

        return res.status(200).json(specifications);
    }
}
export { ListSpecificationsController }