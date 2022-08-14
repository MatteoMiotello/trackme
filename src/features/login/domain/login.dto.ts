import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    public username: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public password: string;
}