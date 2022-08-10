import { DataSource, FindOneOptions, Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { GenericRepository } from "./generic.repository";

export class UserRepository extends GenericRepository<UserEntity>{
    getEntity() {
        return UserEntity;
    }

    findOneByEmail(email: string, options: object | null = null): Promise<UserEntity | null> {
        return this.findOne({
                where: {
                    ...options,
                    email: email
                }
            }
        );
    }
}