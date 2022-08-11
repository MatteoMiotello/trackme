import { GenericMongoRepository } from "./generic-mongo.repository";
import { ResourceLogEntity } from "../schemas/resource-log.entity";
import { ResourceEntity } from "../entities/resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { AggregationOptions, ResourceLogAggregationOptions } from "../Utils/ResourceLogAggregationOptions";

export class ResourceLogRepository extends GenericMongoRepository<ResourceLogEntity> {
    constructor(@InjectRepository(ResourceLogEntity, "mongo") private repo: MongoRepository<ResourceLogEntity>) {
        super();
    }

    protected getRepo(): MongoRepository<ResourceLogEntity> {
        return this.repo;
    }

    getEntity() {
        return ResourceLogEntity;
    }

    public findByResource(resource: ResourceEntity): Promise<ResourceLogEntity[]> {
        return this.repo.find({
            where: {
                resourceToken: resource.token
            }
        });
    }

    public getCount(resource: ResourceEntity, options: AggregationOptions | null) {
        let stage2 = {
            $group: {
                _id: {},
                quantity: {
                    $sum: 1
                }
            }
        };

        if (options) {
            const aggregationObject = Object.assign(new ResourceLogAggregationOptions(), options);
            stage2.$group._id = aggregationObject.getAggregations();
        }

        return this.repo.aggregate([
            {
                $match: {
                    resourceToken: resource.token
                }
            }, stage2
        ]);
    }
}