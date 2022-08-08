import { Module } from '@nestjs/common';
import { LoginController } from './Controllers/login.controller';
import { AuthService } from './services/auth/auth.service';

@Module({
  controllers: [LoginController],
  providers: [AuthService]
})
export class LoginModule {}
