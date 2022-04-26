import { app } from "@shared/infra/http/app";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

let connection : Connection;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuidv4();

        const password = await hash("admin",8);

        await connection.query(
            `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license)
            VALUES('${id}','admin','admin@aluguel.com','${password}','true','now()','JHT-0876')`
        )
    });
    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
    it("Should be able to create a new Category ", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@aluguel.com",
            password:"admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name:"Category Supertest",
            description:"Description Supertest"
        }).set({
            Authorization: `Bearer ${ token }`
        });
        expect(response.status).toBe(201);
    });
    it("Should not be able to create a new Category with name exists", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@aluguel.com",
            password:"admin"
        });
        const { token } = responseToken.body;

        const response = await request(app)
        .post("/categories")
        .send({
            name:"Category Supertest",
            description: "Description Category Supertest"
        })
        .set({
            Authorization: `Bearer ${ token }`
        });

        expect(response.status).toBe(400);

    });
});