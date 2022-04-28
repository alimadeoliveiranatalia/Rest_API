import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

let listSpecificationUseCase: ListSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("List Specifications", () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        listSpecificationUseCase = new ListSpecificationUseCase(specificationsRepositoryInMemory);
    });
    it("Should be able to list all specifications", async () => {
        const specification1 = await specificationsRepositoryInMemory.create({
            name: "Specification Car 1 Test",
            description:"Description Specification 1"
        });
        const specification2 = await specificationsRepositoryInMemory.create({
            name: "Specification Car 2 Test",
            description:"Description specification 2"
        });
        const specifications = await listSpecificationUseCase.execute();
        expect(specifications).toEqual([specification1, specification2]);
    });
});