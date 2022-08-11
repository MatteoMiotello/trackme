import { DataSourceOptions } from "typeorm";
import { ResourceLog } from "../models/schemas/resource-log.schema";

const mongoConfig = (): DataSourceOptions => ({
    type: "mongodb",
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT ? parseInt( process.env.MONGO_PORT, 10 ) : 27017,
    database: process.env.MONGO_DB,
    authSource: 'admin',
    entities: [
        ResourceLog
    ]
});

export default mongoConfig;