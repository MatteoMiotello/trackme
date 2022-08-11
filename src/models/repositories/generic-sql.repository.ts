import {
    DataSource, DeepPartial,
    EntityTarget, FindManyOptions,
    FindOneOptions,
    FindOptionsWhere,
    InsertResult,
    Repository,
    UpdateResult
} from "typeorm";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export abstract class GenericSqlRepository<T extends EntityInterface> {
    abstract getEntity();

    protected abstract getRepo(): Repository<T>;


    findOneById(id: number): Promise<T | null> {
        return this.findOne({
            where: { id: id }
        } );
    }

    findOne(options: FindOneOptions): Promise<T | null> {
        return this.getRepo().findOne(options);
    }

    create( attributes: DeepPartial<T> ) {
        const entity = Object.assign( new (this.getEntity())(), attributes );
        return this.getRepo().save( entity );
    }

    update( id: number, entity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        return this.getRepo().update( id, entity );
    }

    async delete( entity: number | EntityInterface ) {
        if ( typeof entity == "number" ) {
            entity = await this.findOneById(entity);
        }

        return this.getRepo().delete( {
            id: entity.id
        } );
    }

    find( options: FindManyOptions ): Promise<T[]> {
        return this.getRepo().find(options);
    }
}