import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../../models/entities/user.entity";

export const LoggedUser = createParamDecorator<UserEntity>(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);