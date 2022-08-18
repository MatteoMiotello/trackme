import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@ApiExtraModels()
export class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    isActive: boolean;
}

@ApiExtraModels()
export class LoginResponseDto {
    @ApiProperty({
        type: () => UserDto
    })
    user: UserDto;

    @ApiProperty()
    token: string;
}