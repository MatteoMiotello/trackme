import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    public username;

    @IsString()
    @IsNotEmpty()
    public password;
}