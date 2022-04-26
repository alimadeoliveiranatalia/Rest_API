import { v4 as uuidv4 } from "uuid";
import { Connection, createConnection } from "typeorm";
import request from "supertest";
import { hash } from "bcrypt";
import { app } from "@shared/infra/http/app";

let connection: Connection;
describe("List Categories", () => {

    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id =  uuidv4();

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
    it("Should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@aluguel.com",
            password:"admin"
        });
        const { token } = responseToken.body;

        await request(app)
        .post("/categories")
        .send({
            name:"Category Supertest",
            description: "Description Category Supertest"
        }).set({
            Authorization: `Bearer ${ token }`
        });
        const response = await request(app).get("/categories");
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Category Supertest");
    });
});