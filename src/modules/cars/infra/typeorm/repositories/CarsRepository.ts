import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        });
        await this.repository.save(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const findCar = await this.repository.findOne({ license_plate });
        return findCar;
    }
    async findAvailable(
        brand?:string,
        category_id?: string,
        name?:string): Promise<Car[]> {
        
            const carsAveilables = await this.repository
                .createQueryBuilder("c")
                .where("available = :available", { available : true});

            if(brand){
                carsAveilables.andWhere("c.brand = :brand", { brand });
            }

            if(name){
                carsAveilables.andWhere("c.name = :name", { name });
            }
            if(category_id){
                carsAveilables.andWhere("c.category_id = :category_id", { category_id});
            }
            const cars = await carsAveilables.getMany();
            
            return cars;
    }
}
export { CarsRepository }