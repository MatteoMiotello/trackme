import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { LoginModule } from "./features/login/login.module";
import { ResourceModule } from "./features/resource/resource.module";
import { SharedModule } from "./shared/shared.module";
import { ModelsModule } from "./models/models.module";

@Module({
    imports: [
        LoginModule,
        ResourceModule,
        SharedModule,
        ModelsModule,
    ],
    controllers: [
        AppController
    ],
    providers: []
})
export class AppModule {
}
