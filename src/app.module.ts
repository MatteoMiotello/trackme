import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LoginModule } from "./login/login.module";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfiguration from "./config";

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
                return config.get<TypeOrmModuleOptions>("postgres");
            },
            inject: [ConfigModule]
        }),
    ],
    controllers: [AppController],
    providers: []
})
export class AppModule {
}
