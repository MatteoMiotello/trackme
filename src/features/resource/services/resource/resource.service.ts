import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateDto } from "../../Domain/create.dto";
import { ResourceRepository } from "../../../../models/repositories/resource.repository";
import { UserEntity } from "../../../../models/entities/user.entity";
import { DeleteDto } from "../../Domain/delete.dto";
import { ResourceEntity } from "../../../../models/entities/resource.entity";

@Injectable()
export class ResourceService {
    constructor(
        private readonly resourceRepository: ResourceRepository
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
}
