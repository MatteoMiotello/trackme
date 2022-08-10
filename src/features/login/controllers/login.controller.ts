import { Body, Controller, Post, Res } from "@nestjs/common";
import { LoginDto } from "../domain/login.dto";
import { SignupDto } from "../domain/signup.dto";
import { AuthService } from "../../../Shared/services/auth/auth.service";
import { Response } from "express";

@Controller("login")
export class LoginController {
    constructor(private readonly authService: AuthService) {
    }

    @Post()
    public async loginAction(@Body() loginDto: LoginDto, @Res() res: Response) {
        const payload = await this.authService.validateLogin(loginDto);

        if (!payload) {
            return {};
        }

        res.cookie("token", payload.token,{
            sameSite: "strict"
        } ).send( payload );
    }

    @Post("/signup")
    public async signUpAction(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
}