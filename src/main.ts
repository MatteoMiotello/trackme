import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { LoginResponseDto, UserDto } from "./features/login/domain/user.dto";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: true,
            credentials: true,
            exposedHeaders: ["set-cookie"]
        }
    });
    app.use(cookieParser());
    // app.useGlobalPipes(
    //     new ValidationPipe({
    //         transform: true
    //     })
    // );

    const config = new DocumentBuilder()
        .setTitle("Track.me API")
        .setDescription("The Track.me API description")
        .setVersion("1.0")
        .addTag("track")
        .build();
    const document = SwaggerModule.createDocument(app, config, {
            extraModels: [UserDto, LoginResponseDto]
        }
    );
    SwaggerModule.setup("api", app, document);

    await app.listen(3100, "0.0.0.0");
}

bootstrap();
