import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { User } from "src/user/user.model";
import { UserService } from "src/user/user.service"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

constructor(private readonly userService:UserService){
    super();
}

    async validate (username:string,password:string):Promise<User>{

const user=this.userService.getUserByName(username);
if(user==undefined) throw new UnauthorizedException();
if(user!=undefined && (await user).password===password){
    return user;

}
else{
    throw new UnauthorizedException();
}

}

}