import { GenericSqlRepository } from "./generic-sql.repository";
import { ResourceEntity } from "../entities/resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";

export class ResourceRepository extends GenericSqlRepository<ResourceEntity> {
    public constructor(@InjectRepository( ResourceEntity, 'postgres' ) private repo: Repository<ResourceEntity>) {
        super();
    }

    getEntity() {
        return ResourceEntity;
    }

    protected getRepo(): Repository<ResourceEntity> {
        return this.repo;
    }
}