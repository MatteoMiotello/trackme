import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CreateDto } from "../Domain/create.dto";
import { ResourceService } from "../services/resource/resource.service";
import { Request, Response } from "express";
import { JwtAuthGuard } from "../../../shared/guards/jwt-auth-guard.service";
import { LoggedUser } from "../../../shared/Decorators/LoggedUser";
import { UserEntity } from "../../../models/entities/user.entity";

@Controller("resource")
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @Get(':token')
    async getResource(@Req() request: Request, @Param() parameters, @Res() response: Response ) {
        if ( !parameters.token ) {
            throw new NotFoundException();
        }

        const resource = await this.resourceService.getResourceByToken( parameters.token );

        if ( !resource ) {
            throw new NotFoundException();
        }

        this.resourceService.registerLog( resource, request );

        response
            .status( 303 )
            .redirect( resource.content );
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll( @LoggedUser() user: UserEntity ) {
        return this.resourceService.getAllResources(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createAction(@Req() req: Request, @Body() createResourceDto: CreateDto, @LoggedUser() user: UserEntity) {
        return await this.resourceService.createResource(createResourceDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    async deleteAction(@Param() params, @LoggedUser() user: UserEntity) {
        return this.resourceService.deleteResource(params.id, user);
    }
}
