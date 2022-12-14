import { Module } from "@nestjs/common";
import { LoginController } from "./controllers/login.controller";
import { AuthService } from "../../shared/services/auth/auth.service";
import { UserRepository } from "../../models/repositories/user.repository";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { User } from "../../models/entities/user.entity";
import { SharedModule } from "../../shared/shared.module";
import { ModelsModule } from "../../models/models.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Resource } from "../../models/entities/resource.entity";
import { ResourceLog } from "../../models/schemas/resource-log.schema";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => {
                return config.get("jwt");
            },
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature( [User], 'postgres' ),
        SharedModule,
        ModelsModule
    ],
    controllers: [LoginController],
    providers: [
        UserRepository,
    ]
})
export class LoginModule {
}
