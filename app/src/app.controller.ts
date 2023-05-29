import { Controller,Delete, Get, Post, UseGuards,Request, Body, Param, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/role.guard';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user/user.service';
import { User } from './user/user.model';
import PermissionGuard from './auth/permission.guard';
import { Permissions } from './auth/permissions.decorator';
import { CreateUserValidatorPipe } from './dto/validation.pipe';
import { UserSchema } from './dto/schema.dto';

@Controller("app")
export class AppController {
  constructor(private readonly authservice:AuthService,private readonly usersService: UserService)
   {}

  @Post("/login")
  @UseGuards(AuthGuard("local"))
  login(@Request() req): any {
   
    return this.authservice.generateToken(req.user);
   
  }

  @Post("/add")
  @UsePipes(new CreateUserValidatorPipe(UserSchema))
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get("/all")
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }

  @Get("/android-developer")
  @UseGuards(AuthGuard("jwt"),PermissionGuard)
  @Permissions("android_developer")
  androidDeveloperData(@Request() req):String{
    return req.user;
  }

  @Get("/web-developer")
  @UseGuards(AuthGuard("jwt"),PermissionGuard)
  @Permissions("web_developer")
  webDeveloperData(@Request() req):String{
    return req.user;

  }
}
