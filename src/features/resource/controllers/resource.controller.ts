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
import { ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { ResourceDto } from "../Domain/resource.dto";
import { ResourceLogDto } from "../Domain/resource-log.dto";
import { ResourceLog } from "../../../models/schemas/resource-log.schema";

@Controller("resource")
export class ResourceController {
    constructor(
        private readonly resourceService: ResourceService
    ) {
    }

    @Get(":id")
    @ApiResponse({
        type: ResourceDto
    })
    async getResource(@Req() request: Request, @Param("id") id: number, @Res() response: Response) {
        const resource = await this.resourceService.getResourceById(id);

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
    @ApiResponse({
        type: [ResourceDto]
    })
    async getAll(@LoggedUser() user: User): Promise<ResourceDto[]> {
        return this.resourceService.getAllResources(user);
    }

    @UseGuards(JwtAuthGuard)
    @Post("create")
    @ApiResponse({
        type: ResourceDto
    })
    async createAction(@Req() req: Request, @Body() createResourceDto: CreateDto, @LoggedUser() user: User): Promise<ResourceDto> {
        return await this.resourceService.createResource(createResourceDto, user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("delete/:id")
    @ApiParam({ name: "id", description: "Id of resource to delete" })
    async deleteAction(@Param() params, @LoggedUser() user: User) {
        return this.resourceService.deleteResource(params.id, user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("logsCount/:id")
    @ApiParam({ name: "id", description: "Id of resource" })
    @ApiQuery({ name: "aggregatePeriod", enum: ["day", "month", "year"] })
    @ApiQuery({ name: "paramAggregations", type: "{\"name\":string,\"property\":string}[]" })
    @ApiQuery({ name: "aggregateFrom", type: "YYYY-mm-dd" })
    @ApiQuery({ name: "aggregateTo", type: "YYYY-mm-dd" })
    async logsCount(
        @Param() params,
        @LoggedUser() user: User,
        @Query("aggregatePeriod") aggregatePeriod: "day" | "month" | "year" | null,
        @Query("paramAggregations", ParseJsonPipe) paramAggregations: Aggregation[] | null,
        @Query("aggregateFrom") aggregateFrom: string | null,
        @Query("aggregateTo") aggregateTo: string | null
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
            aggregateFrom: aggregateFrom ? new Date(aggregateFrom) : null,
            aggregateTo: aggregateTo ? new Date(aggregateTo) : null
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get("allLogs/:id")
    @ApiParam({ name: "id", description: "Id of resource" })
    @ApiResponse({
        type: ResourceLogDto
    })
    async allLogs(@Param("id", ParseIntPipe) id: number, @LoggedUser() user: User): Promise<ResourceLog[]> {
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
