import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../../models/repositories/user.repository";
import { LoginDto } from "../../../features/login/domain/login.dto";
import { SignupDto } from "../../../features/login/domain/signup.dto";
import { createHash } from "crypto";
import { BadParamException } from "../../exceptions/bad-param.exception";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../../models/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService) {
    }

    public async validateLogin(loginDto: LoginDto): Promise<{user: User, token: string}> {
        const user = await this.userRepository.findOneByEmail(loginDto.username, {
            isActive: true,
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        if (user.password !== this.hash(loginDto.password)) {
            throw new BadParamException("password", "wrong password");
        }

        const token = this.jwtService.sign(
            {
                username: user.email,
                id: user.id
            }, {
                expiresIn: "1h"
            });

        return {
            user: { ...user, password: null },
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

        return this.userRepository.create({
            email: signupDto.email,
            password: hashed
        });
    }

    protected hash(string: string) {
        return createHash("sha512").update(string).digest("hex");
    }

    protected setCookie() {

    }
}
