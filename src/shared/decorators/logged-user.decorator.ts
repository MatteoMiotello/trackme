import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../../models/entities/user.entity";

export const LoggedUser = createParamDecorator<User>(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);