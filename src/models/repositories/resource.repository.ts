import { GenericRepository } from "./generic.repository";
import { ResourceEntity } from "../entities/resource.entity";

export class ResourceRepository extends GenericRepository<ResourceEntity> {
    getEntity() {
        return ResourceEntity;
    }


}