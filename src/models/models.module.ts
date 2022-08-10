import { Module } from '@nestjs/common';
import { ResourceRepository } from "./repositories/resource.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfiguration from "../config";
import { UserRepository } from "./repositories/user.repository";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [getConfiguration]
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return config.get("postgres");
            },
            inject: [ConfigService]
        }),
    ],
    providers: [
        UserRepository,
        ResourceRepository,
    ],
    exports: [
        UserRepository,
        ResourceRepository
    ]
})
export class ModelsModule {

}
