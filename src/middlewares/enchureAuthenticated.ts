import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../erros/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface Ipayload {
    sub: string;
}
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction) {
        const authHeader = request.headers.authorization;

        if(!authHeader){
            throw new AppError("Token missing", 401);
        }

        const [, token] = authHeader.split(" ");

        try {
            const { sub: user_id } = verify(
                token,
                "85226afac4aae2ac1beed64eee170b8c"
                ) as Ipayload;

            const usersRepository = new UsersRepository();

            const findUser = await usersRepository.findById(user_id);

            if (!findUser) {
                throw new AppError("User does not exists!", 401);
            }

            request.findUser = {
                id:user_id
            };
            next();
        } catch {
            throw new AppError("Invalid token!", 401);            
        }

}