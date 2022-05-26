import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    car_id:string;
    user_id:string;
    expected_return_date: Date;
}
@injectable()
class CreateRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
        ){}
    async execute({
        car_id,
        user_id,
        expected_return_date
    }):Promise<Rental>{

        const carUnAvailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnAvailable) {
            throw new AppError("Car is UnAvailable!");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for user");
        }

        const dateNow = this.dateProvider.dateNow();

        const compare = this.dateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        const minimumHour = 24;

        if(compare<minimumHour) {
            throw new AppError("Invalid Return time!");
        }
        
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.carsRepository.updateAvailable(car_id, false);

        return rental;
    }
}
export { CreateRentalUseCase }