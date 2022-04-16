import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificatiosRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];
    
    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();
        Object.assign(specification,{
            name,
            description,
            created_at: new Date()
        });
        this.specifications.push(specification);
    }
    async list(): Promise<Specification[]> {
        const all = this.specifications;
        return all;
    }
    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find((specification)=> specification.name === name);
        return specification;
    }
}
export { SpecificationsRepositoryInMemory }