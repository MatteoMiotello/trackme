import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../../models/repositories/user.repository";
import { LoginDto } from "../../../features/login/domain/login.dto";
import { SignupDto } from "../../../features/login/domain/signup.dto";
import { BadParamException } from "../../exceptions/bad-param.exception";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../../models/entities/user.entity";
import * as bcrypt from "bcrypt";
import { UserDto } from "../../../features/login/domain/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService) {
    }

    public async validateLogin(loginDto: LoginDto): Promise<{ user: UserDto, token: string }> {
        let user = await this.userRepository.findOneByEmail(loginDto.username, {
            isActive: true
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        if (!bcrypt.compareSync( loginDto.password, user.password )) {
            throw new UnauthorizedException();
        }

        const token = this.jwtService.sign(
            {
                username: user.email,
                id: user.id
            }, {
                expiresIn: "5h"
            });

        delete user.password;

        return {
            user: { ...user },
            token: token
        };
    }

    public async signup(signupDto: SignupDto) {
        if (signupDto.password !== signupDto.repeatPassword) {
            throw new BadParamException("password", "Password not equals to repeat password");
        }

        const user = await this.userRepository.findOneByEmail(signupDto.email, { isActive: true });

        if (user) {
            throw new BadParamException("email", "Email already present");
        }

        const hashed = this.hash(signupDto.password);

        let userCreated = await this.userRepository.create({
            email: signupDto.email,
            password: hashed,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName
        });

        delete userCreated.password;

        return userCreated;
    }

    protected hash(string: string) {
        return bcrypt.hashSync( string, 10 );
    }
}
