import { Module } from '@nestjs/common';
import { LoginController } from './Controllers/login.controller';
import { AuthService } from './Services/auth/auth.service';
import { UserRepository } from "../../models/repositories/UserRepository";

@Module({
  controllers: [LoginController],
  providers: [
      AuthService,
      UserRepository
  ]
})
export class LoginModule {}
