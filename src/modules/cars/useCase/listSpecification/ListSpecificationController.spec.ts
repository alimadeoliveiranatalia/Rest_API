import { v4 as uuid } from "uuid";
import { Connection  } from "typeorm";
import createConnection from "@shared/infra/typeorm";
import request from "supertest";
import { hash } from "bcrypt";
import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("List Specifications", () => {
    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuid();

        const password = await hash("admin", 8);

        await connection.query(`
            INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license)
            VALUES('${id}','admin','admin@aluguel.com','${password}','true','now()','JHT-0876')`
        );
    });
    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });
    it("Should be able list all specifications", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@aluguel.com",
            password:"admin"
        });
        const { token } = responseToken.body;

        await request(app)
        .post("/specifications")
        .send({
            name:"Specification Supertest",
            description:"Description Specification"
        }).set({
            Authorization:`Bearer ${ token }`
        });
        const response = await request(app).get("/specifications");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Specification Supertest");
    });
});