import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@ApiExtraModels()
export class ResourceDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    userId: number;

    @ApiProperty()
    token: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    updatedDate: Date | null;

    @ApiProperty()
    createdDate: Date;
}