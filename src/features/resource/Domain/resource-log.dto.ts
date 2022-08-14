import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

@ApiExtraModels()
export class ResourceLogDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    resourceToken: string;

    @ApiProperty()
    userAgent: string;

    @ApiProperty()
    remoteIp: string;

    @ApiProperty()
    request: object;

    @ApiProperty()
    updatedDate: Date | null;

    @ApiProperty()
    createdDate: Date;
}