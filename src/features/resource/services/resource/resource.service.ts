import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateDto } from "../../Domain/create.dto";
import { ResourceRepository } from "../../../../models/repositories/resource.repository";
import { User } from "../../../../models/entities/user.entity";
import { DeleteDto } from "../../Domain/delete.dto";
import { Resource } from "../../../../models/entities/resource.entity";
import { ResourceLogRepository } from "../../../../models/repositories/resource-log.repository";
import { Request } from "express";
import * as geoip from "geoip-lite";
import { AggregationCursor } from "typeorm";
import { ResourceLog } from "../../../../models/schemas/resource-log.schema";
import {
    AggregationOptions,
    ResourceLogAggregationOptions
} from "../../../../models/Utils/resource-logs-aggregations.options";

@Injectable()
export class ResourceService {
    constructor(
        private readonly resourceRepository: ResourceRepository,
        private readonly resourceLogRepository: ResourceLogRepository,
    ) {
    }

    getAllResources( user: User ): Promise<Resource[]> {
        return this.resourceRepository.find({
            where:{
                userId: user.id,
                isActive: true
            }
        })
    }

    createResource(createDto: CreateDto, user: User) {
        return this.resourceRepository.create({ content: createDto.destination, userId: user.id });
    }

    async deleteResource(id: number, user: User) {
        const resource = await this.resourceRepository.findOneById(id);

        if (!resource) {
            return;
        }

        if (resource.userId != user.id) {
            throw new UnauthorizedException();
        }

        resource.isActive = false;

        return this.resourceRepository.update(resource.id, resource);
    }

    public getResourceByToken( token: string ): Promise<Resource | null> {
        return this.resourceRepository.findOne( {
            where: {
                token: token,
                isActive: true
            }
        } );
    }

    public getResourceById( id: number ): Promise<Resource | null> {
        return this.resourceRepository.findOneById( id );
    }

    public registerLog(resource: Resource, request: Request){
        const ip = request.ip;

        const location = geoip.lookup( ip );

        return this.resourceLogRepository.create( {
            resourceToken: resource.token,
            userAgent: request.get( 'user-agent' ) ,
            remoteIp: ip,
            location: location,
            request: null,
        } )
    }

    public getLogsCount(resource: Resource, options: AggregationOptions ){
        return this.resourceLogRepository.getCount( resource, options ).toArray();
    }

    public getAllLogs( resource: Resource ){
        return this.resourceLogRepository.findByResource( resource );
    }
}
