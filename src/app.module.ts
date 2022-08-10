import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LoginModule } from "./features/login/login.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfiguration from "./config";
import { UserRepository } from "./models/repositories/UserRepository";
import { ResourceModule } from './features/resource/resource.module';
import { ResourceController } from './features/resource/controllers/resource.controller';
import { JwtStrategy } from './Shared/strategies/jwt-strategy.service';
import { AuthService } from "./Shared/services/auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtAuthGuard } from "./Shared/guards/jwt-auth-guard.service";
import jwtConfiguration from "./config/jwt";

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
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return config.get("jwt");
            },
            inject: [ConfigService]
        }),
        ResourceModule
    ],
    controllers: [
        AppController,
        ResourceController
    ],
    providers: [
        UserRepository,
        AuthService,
        JwtStrategy,
        JwtAuthGuard,
    ]
})
export class AppModule {
}
