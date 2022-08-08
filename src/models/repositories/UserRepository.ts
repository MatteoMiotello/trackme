import { DataSource, FindOneOptions, Repository } from "typeorm";
import { User } from "../User";
import { Injectable } from "@nestjs/common";
import { SignupDto } from "../../features/login/Domain/SignupDto";

@Injectable()
export class UserRepository {
    private repo: Repository<User>;

    constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository<User>(User);
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

    findOne(options: FindOneOptions): Promise<User | null> {
        return this.repo.findOne(options);
    }

    create( user: Partial<User> ) {
        return this.repo.insert( user );
    }
}