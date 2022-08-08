import { DataSource, FindOneOptions, Repository } from "typeorm";
import { User } from "../User";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository {
    private repo: Repository<User>;

    constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository<User>(User);
    }

    findOneByEmail(email: string): Promise<User | null> {
        return this.findOne({
                where: {
                    email: email
                }
            }
        );
    }

    findOne(options: FindOneOptions): Promise<User | null> {
        return this.repo.findOne(options);
    }
}