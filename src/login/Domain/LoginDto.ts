import { IsString } from "class-validator";

export class LoginDto {
    @IsString()
    public username;

    @IsString()
    public password;
}