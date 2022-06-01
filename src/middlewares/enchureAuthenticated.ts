import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/erros/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface Ipayload {
    sub: string;
}
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction) {
        const authHeader = request.headers.authorization;

        const userTokensRepository = new UsersTokensRepository();

        if(!authHeader){
            throw new AppError("Token missing", 401);
        }

        const [, token] = authHeader.split(" ");

        try {
            const { sub: user_id } = verify(
                token,
                auth.secret_refresh_token
            ) as Ipayload;

            const findUser = await userTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token    
            );

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