import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LoginModule } from "./login/login.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfiguration from "./config";
import { UserRepository } from "./models/repositories/UserRepository";

@Module({
    imports: [
        LoginModule,
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
        })
    ],
    controllers: [
        AppController
    ],
    providers: [
        UserRepository
    ]
})
export class AppModule {
}
