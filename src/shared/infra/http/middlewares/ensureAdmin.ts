import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { AppError } from "@shared/erros/AppError";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
){
    const {id} = request.findUser;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if(!user.isAdmin){
        throw new AppError("User is not admin!");        
    }
    return next();
}