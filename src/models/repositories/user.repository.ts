import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { GenericSqlRepository } from "./generic-sql.repository";
import { InjectRepository } from "@nestjs/typeorm";

export class UserRepository extends GenericSqlRepository<User> {
    public constructor(@InjectRepository(User, "postgres") private repo: Repository<User>) {
        super();
    }

    getEntity() {
        return User;
    }

    findOneByEmail(email: string, options: object | null = null): Promise<User | null> {
        return this.findOne({
                where: {
                    ...options,
                    email: email
                }
            }
        );
    }

    public getRepo(): Repository<User> {
        return this.repo;
    }
}