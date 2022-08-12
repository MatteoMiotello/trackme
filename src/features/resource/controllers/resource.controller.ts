import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Req,
    Res,
    UnauthorizedException,
    UseGuards
} from "@nestjs/common";
import { CreateDto } from "../Domain/create.dto";
import { ResourceService } from "../services/resource/resource.service";
import { Request, Response } from "express";
import { JwtAuthGuard } from "../../../shared/guards/jwt-auth-guard.service";
import { LoggedUser } from "../../../shared/decorators/logged-user.decorator";
import { User } from "../../../models/entities/user.entity";
import { Aggregation } from "../../../models/Utils/resource-logs-aggregations.options";
import { ParseJsonPipe } from "../../../shared/Pipes/parse-json.pipe";

@Controller("resource")
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @Get(":token")
    async getResource(@Req() request: Request, @Param() parameters, @Res() response: Response) {
        if (!parameters.token) {
            throw new NotFoundException();
        }

        const resource = await this.resourceService.getResourceByToken(parameters.token);

        if (!resource) {
            throw new NotFoundException();
        }

        this.resourceService.registerLog(resource, request);

        response
            .status(303)
            .redirect(resource.content);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@LoggedUser() user: User) {
        return this.resourceService.getAllResources(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    async createAction(@Req() req: Request, @Body() createResourceDto: CreateDto, @LoggedUser() user: User) {
        return await this.resourceService.createResource(createResourceDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    async deleteAction(@Param() params, @LoggedUser() user: User) {
        return this.resourceService.deleteResource(params.id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("logsCount/:id")
    async logsCount(
        @Param() params,
        @LoggedUser() user: User,
        @Query("aggregatePeriod") aggregatePeriod: "day" | "month" | "year" | null,
        @Query("paramAggregations", ParseJsonPipe) paramAggregations: Aggregation[] | null,
        @Query( "aggregateFrom" ) aggregateFrom: string | null,
        @Query( "aggregateTo" ) aggregateTo: string | null
    ) {
        const resource = await this.resourceService.getResourceById(params.id);

        if (!resource) {
            throw new NotFoundException();
        }

        if (resource.userId != user.id) {
            throw new UnauthorizedException();
        }

        return await this.resourceService.getLogsCount(resource, {
            aggregatePeriod: aggregatePeriod,
            paramAggregations: paramAggregations,
            aggregateFrom: aggregateFrom ? new Date( aggregateFrom ): null,
            aggregateTo: aggregateTo ? new Date( aggregateTo ): null,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get("allLogs/:id")
    async allLogs(@Param("id", ParseIntPipe) id: number, @LoggedUser() user: User) {
        const resource = await this.resourceService.getResourceById(id);

        if (!resource) {
            throw new NotFoundException();
        }

        if (resource.userId != user.id) {
            throw new UnauthorizedException();
        }

        return this.resourceService.getAllLogs(resource);
    }
}
