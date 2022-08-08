import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { LoginDto } from "../Domain/LoginDto";
import { SignupDto } from "../Domain/SignupDto";
import { AuthService } from "../Services/auth/auth.service";

@Controller("login")
export class LoginController {
    constructor(private readonly authService: AuthService) {
    }

    @Post()
    public async loginAction( @Body() loginDto: LoginDto ) {
       return this.authService.login( loginDto );
    }

    @Post('/signup')
    public async signUpAction( @Body() signupDto: SignupDto ) {
        return this.authService.signup( signupDto );
    }
}