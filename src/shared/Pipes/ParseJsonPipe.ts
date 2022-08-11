import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseJsonPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata): any {
        if ( typeof value != 'string' ) {
            throw new BadRequestException( metadata.type, 'is not a string' );
        }

        return JSON.parse( value );
    }
}