import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateDto } from "../Domain/create.dto";
import { ResourceService } from "../services/resource/resource.service";
import { Request } from "express";
import { JwtAuthGuard } from "../../../shared/guards/jwt-auth-guard.service";
import { LoggedUser } from "../../../shared/Decorators/LoggedUser";
import { UserEntity } from "../../../models/entities/user.entity";

@Controller("resource")
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
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
