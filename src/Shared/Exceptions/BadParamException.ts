import { BadRequestException } from "@nestjs/common";

export class BadParamException extends BadRequestException {
    constructor(paramName: string, description: string) {
        super(
            {
                paramName: paramName,
                error: description
        } );
    }
}