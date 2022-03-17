import { Specification } from "../entities/Specification";

interface ICreateSpecidicationDTO{
    name: string;
    description: string;
}
interface ISpecificationsRepository{
    create({description, name}: ICreateSpecidicationDTO): Promise<void>;
    
    findByName(name: string): Promise<Specification>;
}
export {ICreateSpecidicationDTO,ISpecificationsRepository}