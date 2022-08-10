import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import getConfiguration from "../config";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./services/auth/auth.service";
import { JwtStrategy } from "./strategies/jwt-strategy.service";
import { JwtAuthGuard } from "./guards/jwt-auth-guard.service";
import { ModelsModule } from "../models/models.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [getConfiguration]
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return config.get("jwt");
            },
            inject: [ConfigService]
        }),
        ModelsModule,
    ],
    providers: [
        AuthService,
        JwtStrategy,
        JwtAuthGuard,
    ],
    exports: [
        AuthService,
        JwtStrategy,
        JwtAuthGuard,
    ]
})
export class SharedModule {}
