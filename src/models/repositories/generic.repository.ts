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

@Injectable()
export abstract class GenericRepository<T extends EntityInterface> {
    protected repo: Repository<T>;

    public constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository<T>(this.getEntity());
    }

    abstract getEntity();

    findOneById(id: number): Promise<T | null> {
        return this.findOne({
            where: { id: id }
        } );
    }

    findOne(options: FindOneOptions): Promise<T | null> {
        return this.repo.findOne(options);
    }

    create( entity: DeepPartial<T> ) {
        return this.repo.save( entity );
    }

    update( id: number, entity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
        return this.repo.update( id, entity );
    }

    async delete( entity: number | EntityInterface ) {
        if ( typeof entity == "number" ) {
            entity = await this.findOneById(entity);
        }

        return this.repo.delete( {
            id: entity.id
        } );
    }

    find( options: FindManyOptions ): Promise<T[]> {
        return this.repo.find(options);
    }
}