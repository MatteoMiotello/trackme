import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "../models/user.entity";
import { ResourceEntity } from "../models/resource.entity";

const postgresConfig = (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
    database: process.env.POSTGRES_DATABASE || 'postgres',
    username: process.env.POSTGRES_USERNAME || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    entities: [
        UserEntity,
        ResourceEntity
    ],
    synchronize: false,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    migrationsTransactionMode: "each",
    logging: true
});

export default postgresConfig;