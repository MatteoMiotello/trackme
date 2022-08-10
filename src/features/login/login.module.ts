import { Module } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller";
import { AuthService } from "../../Shared/services/auth/auth.service";
import { UserRepository } from "../../models/repositories/UserRepository";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return config.get("jwt");
            },
            inject: [ConfigService]
        })
    ],
    controllers: [LoginController],
    providers: [
        UserRepository,
        AuthService

    ]
})
export class LoginModule {
}
