import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/dto/user.dto";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserEvent } from "./create-user.event";



@Injectable()
export class UserService{
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
         @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
        @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
      ) {}

create(createUserDto:CreateUserDto) :Promise<User>{
    this.communicationClient.emit(
        'user_created',
        new CreateUserEvent("the user has been created and saved"),
      );
      this.analyticsClient.emit(
        'user_created',
        new CreateUserEvent("the user has been saved in analytics"),
      );
    return this.userModel.create({
        username: createUserDto.username,
        password: createUserDto.password,
        email: createUserDto.email,
        age: createUserDto.age,
        role: createUserDto.role,
    });

    
}

async findAll() {
    return this.userModel.findAll();
}


getUserByName(username) {
    const user = this.userModel.findOne({
        where: {
            username,
        },
    });
    return user;
}


async remove(id) {
    const user = await this.userModel.findOne({
        where: {
            id,
        },
    });
    await user.destroy();
}
}
