import { v4 as uuid } from 'uuid';
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/erros/AppError";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}
    async execute(email: string){
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("User does not exists!");
        }

        const token = uuid();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date
        });
    }
}
export { SendForgotPasswordMailUseCase }