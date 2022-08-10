import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateDto } from "../Domain/create.dto";
import { JwtAuthGuard } from "../../../Shared/guards/jwt-auth-guard.service";

@Controller('resource')
export class ResourceController {
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAction( createResourceDto: CreateDto ) {

    }
}
