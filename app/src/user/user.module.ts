import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [SequelizeModule.forFeature([User]),
  ClientsModule.register([
    {
      name: 'COMMUNICATION',
      transport: Transport.TCP,
      options: { port: 3004 },
    },
    {
      name: 'ANALYTICS',
      transport: Transport.TCP,
      options: { port: 3002 },
    },
  ]),
],
  controllers: [],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
