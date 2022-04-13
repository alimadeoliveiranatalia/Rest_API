import { getRepository, Repository } from "typeorm";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecidicationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificatiosRepository";

class SpecificationsRepository implements ISpecificationsRepository{
    private repository: Repository<Specification>;

    constructor(){
        this.repository = getRepository(Specification);
    }
    async create({ description, name }: ICreateSpecidicationDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name,
        });
        await this.repository.save(specification);
    }
    
    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({name});
        return specification;
    }
    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }
}
export {SpecificationsRepository}