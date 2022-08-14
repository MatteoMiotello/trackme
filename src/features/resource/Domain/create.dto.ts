import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    destination: string;
}