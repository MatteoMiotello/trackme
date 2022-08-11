import { GenericMongoRepository } from "./generic-mongo.repository";
import { ResourceLog } from "../schemas/resource-log.schema";
import { Resource } from "../entities/resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { AggregationOptions, ResourceLogAggregationOptions } from "../Utils/resource-logs-aggregations.options";

export class ResourceLogRepository extends GenericMongoRepository<ResourceLog> {
    constructor(@InjectRepository(ResourceLog, "mongo") private repo: MongoRepository<ResourceLog>) {
        super();
    }

    protected getRepo(): MongoRepository<ResourceLog> {
        return this.repo;
    }

    getEntity() {
        return ResourceLog;
    }

    public findByResource(resource: Resource): Promise<ResourceLog[]> {
        return this.repo.find({
            where: {
                resourceToken: resource.token
            }
        });
    }

    public getCount(resource: Resource, options: AggregationOptions | null) {
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