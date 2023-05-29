import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "src/user/user.model";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

constructor(){
    super( {jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: "jwtConstants.secret",});
}
validate (payload:User):User{
return payload;

}

}