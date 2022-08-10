import { IsNotEmpty, IsString } from "class-validator";

export class SignupDto{
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    repeatPassword: string;
}