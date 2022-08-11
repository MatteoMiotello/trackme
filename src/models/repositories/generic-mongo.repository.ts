import { DataSource, InsertResult, MongoRepository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { MongoFindOneOptions } from "typeorm/find-options/mongodb/MongoFindOneOptions";
import { MongoFindManyOptions } from "typeorm/find-options/mongodb/MongoFindManyOptions";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ResourceLogEntity } from "../schemas/resource-log.entity";

@Injectable()
export abstract class GenericMongoRepository<T> {
    protected abstract getRepo(): MongoRepository<T>;

    protected abstract getEntity();

    create( attributes: QueryDeepPartialEntity<T> ): Promise<InsertResult> {
        const entity = Object.assign( new ( this.getEntity() )(), attributes );
        return this.getRepo().save( entity );
    }

    findOne( options: MongoFindOneOptions<T> ): Promise<T | null> {
        return this.getRepo().findOne( options );
    }

    find( option: MongoFindManyOptions<T> ): Promise<T[]> {
        return this.getRepo().find( option );
    }
}