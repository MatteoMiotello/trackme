import { Module } from "@nestjs/common";
import { ResourceService } from "./services/resource/resource.service";
import { ResourceController } from "./controllers/resource.controller";
import { SharedModule } from "../../shared/shared.module";
import { ModelsModule } from "../../models/models.module";

@Module({
    imports: [
        SharedModule,
        ModelsModule
    ],
    controllers: [ResourceController],
    providers: [ResourceService]
})
export class ResourceModule {
}
