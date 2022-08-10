import { IsNotEmpty, IsString } from "class-validator";

export class CreateDto {
    @IsString()
    @IsNotEmpty()
    destination: string;
}