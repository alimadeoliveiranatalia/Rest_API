import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
       const car = await carsRepositoryInMemory.create({
           name: "Car1",
           description: "Description Car1",
           daily_rate: 110.50,
           license_plate: "DER-3487",
           fine_amount:45.87,
           brand:"Car Brand",
           category_id:"category_id"
       }); 
        const cars = await listAvailableCarsUseCase.execute({});
       expect(cars).toEqual([car]);
    });
    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Description Car2",
            daily_rate: 125.50,
            license_plate:"JDK-7639",
            fine_amount:127.95,
            brand:"Car_brand test",
            category_id:"category_id"
        });
        const find_cars = await listAvailableCarsUseCase.execute({
            brand:"Car_band test"
        });
        expect(find_cars).toEqual([car]);
    });
    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Description Car3",
            daily_rate: 135.50,
            license_plate:"JAY-7089",
            fine_amount:129.95,
            brand:"Car_brand3 test",
            category_id:"category_id"
        });
        const find_cars = await listAvailableCarsUseCase.execute({
            name:"Car3"
        });
        expect(find_cars).toEqual([car]);
    });
    it("Should be able to list all available cars by category_id", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car4",
            description: "Description Car4",
            daily_rate: 195.59,
            license_plate:"JAY-7039",
            fine_amount:827.95,
            brand:"Car_brand4 test",
            category_id:"127"
        });
        const find_cars = await listAvailableCarsUseCase.execute({
            category_id:"127"
        });
        expect(find_cars).toEqual([car]);
    });
});