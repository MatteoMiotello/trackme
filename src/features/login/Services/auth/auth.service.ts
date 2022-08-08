import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../../../../models/repositories/UserRepository";
import { LoginDto } from "../../Domain/LoginDto";
import { SignupDto } from "../../Domain/SignupDto";
import { createHash } from "crypto";
import { BadParamException } from "../../../../Shared/Exceptions/BadParamException";
import { log } from "util";

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {
    }

    public async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOneByEmail(loginDto.username, { isActive: true });

        if ( !user ) {
            throw new NotFoundException();
        }

        if ( user.password != this.hash( loginDto.password ) ) {
            throw new BadParamException( 'password', 'wrong password' );
        }

        return user;
    }

    public async signup(signupDto: SignupDto) {
        if (signupDto.password !== signupDto.repeatPassword) {
            throw new BadParamException("password", "Password not equals to repeat password");
        }

        const user = await this.userRepository.findOneByEmail( signupDto.email, { isActive: true } );

        if ( user ) {
            throw new BadParamException( 'email', 'Email already present' );
        }

        const hashed = this.hash( signupDto.password );

        return this.userRepository.create( {
            email: signupDto.email,
            password: hashed,
        } );
    }

    protected hash( string: string ) {
        return createHash("sha512").update(string).digest( 'hex' );
    }
}
