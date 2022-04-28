import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

let listCategoriesUseCase: ListCategoriesUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("List Categories", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepositoryInMemory);
    });

    it("Should be able to list all categories", async () => {
        const category = await categoriesRepositoryInMemory.create({
            name:"Export Dual",
            description:"Description Export Dual"
        });
        const categories = await listCategoriesUseCase.execute();
        expect(categories).toEqual([category]);
    });
});