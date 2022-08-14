import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    repeatPassword: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        nullable: true
    })
    firstName: string | null;

    @IsOptional()
    @IsString()
    @ApiProperty({
        nullable: true
    })
    lastName: string | null;
}