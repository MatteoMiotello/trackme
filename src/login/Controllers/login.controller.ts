import { Body, Controller, NotFoundException, Post } from "@nestjs/common";
import { LoginDto } from "../Domain/LoginDto";
import { of } from "rxjs";
import { UserRepository } from "../../models/repositories/UserRepository";
import { log } from "util";

@Controller("login")
export class LoginController {
    constructor(private readonly userRepository: UserRepository) {
    }

    @Post()
    public async loginAction( @Body() loginDto: LoginDto ) {
        const user = await this.userRepository.findOneByEmail( loginDto.username );

        if ( !user ) {
            throw new NotFoundException();
        }

        return user;
    }
}