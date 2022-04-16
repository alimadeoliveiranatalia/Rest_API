import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationRepositoryInMemory: SpecificationsRepositoryInMemory;
describe("Create Specification", () => {
    beforeEach(() => {
        specificationRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepositoryInMemory);
    });
    
    it("Should be able to create a new specification", async () => {
        const specification = {
            name: "Specification Test",
            description: "Specification Description Test"
        }
        await createSpecificationUseCase.execute({
            name: specification.name,
            description: specification.description
        });
        const specificationCreated = await specificationRepositoryInMemory.findByName(
            specification.name
        );
        expect(specificationCreated).toHaveProperty("id");
    });

});