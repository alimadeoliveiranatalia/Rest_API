import { AppError } from "@erros/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserCase";

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license:"000123",
            email:"user@test.com",
            password:"1234",
            name:"User Test"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");

    });

    it("should not be able to authenticate an nonexistent user", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password:"1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "user@user.com",
                password: "1234",
                name: "User Test Error",
            }
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});