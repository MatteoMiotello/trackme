import { Module } from "@nestjs/common";
import { ResourceRepository } from "./repositories/resource.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfiguration from "../config";
import { UserRepository } from "./repositories/user.repository";
import { ResourceLogRepository } from "./repositories/resource-log.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Resource } from "./entities/resource.entity";
import { ResourceLog } from "./schemas/resource-log.schema";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [getConfiguration]
        }),
        TypeOrmModule.forRootAsync({
            name: "postgres",
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return config.get("postgres");
            },
            inject: [ConfigService]
        }),
        TypeOrmModule.forRootAsync({
            name: "mongo",
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return config.get("mongo");
            },
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature( [User, Resource], 'postgres' ),
        TypeOrmModule.forFeature( [ResourceLog], 'mongo' )
    ],
    providers: [
        UserRepository,
        ResourceRepository,
        ResourceLogRepository
    ],
    exports: [
        UserRepository,
        ResourceRepository,
        ResourceLogRepository
    ]
})
export class ModelsModule {

}
