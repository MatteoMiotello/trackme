import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { GenericSqlRepository } from "./generic-sql.repository";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository extends GenericSqlRepository<UserEntity> {
    public constructor(@InjectRepository(UserEntity, "postgres") private repo: Repository<UserEntity>) {
        super();
    }

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

    protected getRepo(): Repository<UserEntity> {
        return this.repo;
    }
}