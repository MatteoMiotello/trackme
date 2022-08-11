import { GenericSqlRepository } from "./generic-sql.repository";
import { Resource } from "../entities/resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

export class ResourceRepository extends GenericSqlRepository<Resource> {
    public constructor(@InjectRepository( Resource, 'postgres' ) private repo: Repository<Resource>) {
        super();
    }

    getEntity() {
        return Resource;
    }

    protected getRepo(): Repository<Resource> {
        return this.repo;
    }
}