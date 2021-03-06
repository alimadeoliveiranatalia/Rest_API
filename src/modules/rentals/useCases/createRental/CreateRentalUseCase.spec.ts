import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/erros/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory:CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental",() => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car Test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 50,
            category_id: "12365",
            brand: "brand"
        });
        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id:"121212",
            expected_return_date: dayAdd24Hours
        });
        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open to the same user",
    async () => {
        const rental = await rentalsRepositoryInMemory.create({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: dayAdd24Hours
        });
        await expect(
                createRentalUseCase.execute({
                user_id: rental.user_id,
                car_id:"345790",
                expected_return_date: dayAdd24Hours
            })

        ).rejects.toEqual(new AppError("There's a rental in progress for user"));
    }
    );

    it("Should not be able to create a new rental if there is another open to the same car",
    async () => {
        await rentalsRepositoryInMemory.create({
            user_id:"123",
            car_id:"test",
            expected_return_date: dayAdd24Hours
        });
        await expect(
            createRentalUseCase.execute({
                user_id:"345",
                car_id: "test",
                expected_return_date: dayAdd24Hours
            })
        ).rejects.toEqual(new AppError("Car is UnAvailable!"));
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id:"123",
                car_id:"test",
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toEqual(new AppError("Invalid Return time!"));
    }
    
    );
});