import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: true,
      credentials: true,
      exposedHeaders: ["set-cookie"],
    }
  });
  app.use(cookieParser())
  app.useGlobalPipes(
      new ValidationPipe({
        transform: true
      })
  );
  await app.listen(3100, '0.0.0.0');
}
bootstrap();
