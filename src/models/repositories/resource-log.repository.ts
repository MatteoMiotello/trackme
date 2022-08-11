import { GenericMongoRepository } from "./generic-mongo.repository";
import { ResourceLogEntity } from "../schemas/resource-log.entity";
import { ResourceEntity } from "../entities/resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";

export class ResourceLogRepository extends GenericMongoRepository<ResourceLogEntity>{
    constructor( @InjectRepository( ResourceLogEntity, 'mongo') private repo: MongoRepository<ResourceLogEntity>) {
        super();
    }

    protected getRepo(): MongoRepository<ResourceLogEntity> {
        return this.repo;
    }

    getEntity() {
        return ResourceLogEntity;
    }

    public findByResource( resource: ResourceEntity ): Promise<ResourceLogEntity[]> {
        return this.repo.find( {
            where: {
                resourceToken: resource.token,
            }
        } );
    }
}