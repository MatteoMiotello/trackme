import { Body, Controller, Post, Res } from "@nestjs/common";
import { LoginDto } from "../domain/login.dto";
import { SignupDto } from "../domain/signup.dto";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { Response } from "express";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { User } from "../../../models/entities/user.entity";
import { LoginResponseDto, UserDto } from "../domain/user.dto";

@Controller("login")
export class LoginController {
    constructor(private readonly authService: AuthService) {
    }

    @Post()
    @ApiResponse( {
        description: 'Login success',
        type: LoginResponseDto
    } )
    @ApiUnauthorizedResponse({
        description: 'If email is incorrect'
    })
    @ApiBadRequestResponse({
        description: 'If password is incorrect'
    })
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
    @ApiResponse({
        description: 'User created success',
        type: UserDto
    })
    public async signUpAction(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }
}