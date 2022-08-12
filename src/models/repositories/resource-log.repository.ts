import { GenericMongoRepository } from "./generic-mongo.repository";
import { ResourceLog } from "../schemas/resource-log.schema";
import { Resource } from "../entities/resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { AggregationOptions, ResourceLogAggregationHelper } from "../Utils/resource-logs-aggregations.options";

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
        let aggregationHelper: ResourceLogAggregationHelper | null = null;
        if (options) {
            aggregationHelper = Object.assign(new ResourceLogAggregationHelper(), options);
        }

        let stage1 = {
            $match: {
                $and: []
            }
        };

        stage1.$match.$and = [
            { resourceToken: resource.token }
        ];

        if (aggregationHelper) {
            stage1.$match.$and = [
                ...stage1.$match.$and,
                ...aggregationHelper.getAggregateFromTo()
            ];
        }

        let stage2 = {
            $group: {
                _id: {},
                quantity: {
                    $sum: 1
                }
            }
        };

        if (aggregationHelper) {
            stage2.$group._id = aggregationHelper.getGroupsBy();
        }

        return this.repo.aggregate([
            stage1,
            stage2
        ]);
    }
}