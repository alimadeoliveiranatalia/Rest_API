import { Specification } from "../entities/Specification";

interface ICreateSpecidicationDTO{
    name: string;
    description: string;
}
interface ISpecificationsRepository{
    create({description, name}: ICreateSpecidicationDTO): void;
    list(): Specification[];
    findByName(name: string): Specification;
}
export {ICreateSpecidicationDTO,ISpecificationsRepository}