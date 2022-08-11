import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateDto } from "../../Domain/create.dto";
import { ResourceRepository } from "../../../../models/repositories/resource.repository";
import { UserEntity } from "../../../../models/entities/user.entity";
import { DeleteDto } from "../../Domain/delete.dto";
import { ResourceEntity } from "../../../../models/entities/resource.entity";
import { ResourceLogRepository } from "../../../../models/repositories/resource-log.repository";
import { Request } from "express";
import * as geoip from "geoip-lite";

@Injectable()
export class ResourceService {
    constructor(
        private readonly resourceRepository: ResourceRepository,
        private readonly resourceLogRepository: ResourceLogRepository,
    ) {
    }

    getAllResources( user: UserEntity ): Promise<ResourceEntity[]> {
        return this.resourceRepository.find({
            where:{
                userId: user.id,
                isActive: true
            }
        })
    }

    createResource(createDto: CreateDto, user: UserEntity) {
        return this.resourceRepository.create({ content: createDto.destination, userId: user.id });
    }

    async deleteResource(id: number, user: UserEntity) {
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

    public getResourceByToken( token: string ): Promise<ResourceEntity | null> {
        return this.resourceRepository.findOne( {
            where: {
                token: token,
                isActive: true
            }
        } );
    }

    public registerLog(resource: ResourceEntity, request: Request){
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
}
