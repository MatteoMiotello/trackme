import { DataSource, FindOneOptions, Repository } from "typeorm";
import { UserEntity } from "../user.entity";
import { Injectable } from "@nestjs/common";
import { SignupDto } from "../../features/login/domain/signup.dto";

@Injectable()
export class UserRepository {
    private repo: Repository<UserEntity>;

    constructor(private dataSource: DataSource) {
        this.repo = this.dataSource.getRepository<UserEntity>(UserEntity);
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

    findOne(options: FindOneOptions): Promise<UserEntity | null> {
        return this.repo.findOne(options);
    }

    create( user: Partial<UserEntity> ) {
        return this.repo.insert( user );
    }
}