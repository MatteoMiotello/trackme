import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../services/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserRepository } from "../../models/repositories/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            ignoreExpiration: false,
            secretOrKey: configService.get( 'jwt' ).secret,
        });
    }

    async validate(payload) {
        const user = this.userRepository.findOneById( payload.id );

        if ( user ) {
            return user;
        }

        return null;
    }

}

const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies['token']
    }

    return token;
};
