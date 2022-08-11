import { Module } from "@nestjs/common";
import { ResourceRepository } from "./repositories/resource.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfiguration from "../config";
import { UserRepository } from "./repositories/user.repository";
import { ResourceLogRepository } from "./repositories/resource-log.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { UserEntity } from "./entities/user.entity";
import { ResourceEntity } from "./entities/resource.entity";
import { ResourceLogEntity } from "./schemas/resource-log.entity";

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
        TypeOrmModule.forFeature( [UserEntity, ResourceEntity], 'postgres' ),
        TypeOrmModule.forFeature( [ResourceLogEntity], 'mongo' )
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
