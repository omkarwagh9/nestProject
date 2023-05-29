import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.model";

@Injectable()
export class AuthService{

    constructor(private readonly jwtService:JwtService){

    }

   generateToken(payload:User):String{
    return this.jwtService.sign(payload.toJSON());
   }


}