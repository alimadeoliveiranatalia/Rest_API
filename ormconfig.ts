export default {
    "type": "postgres",
    "port": process.env.port,
    "host": process.env.host,
    "username": process.env.username,
    "password": process.env.password,
    "database": "cars",
    "migrations": ["./src/shared/infra/typeorm/migrations/*.ts"],
    "entities": ["./src/modules/**/entities/*.ts"],
    "cli": {
        "migrationsDir": "./src/shared/infra/typeorm/migrations"
    }
}