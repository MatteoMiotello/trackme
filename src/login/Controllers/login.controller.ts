import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../Domain/LoginDto";
import { of } from "rxjs";

@Controller("login")
export class LoginController {
    @Post()
    public loginAction( @Body() loginDto: LoginDto ) {
        return of( loginDto );
    }
}
