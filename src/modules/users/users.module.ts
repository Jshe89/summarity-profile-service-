import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlockedUsersModule } from '@modules/blocked-users/blocked-users.module';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    forwardRef(() => BlockedUsersModule)
  ],
  providers: [UsersService, UsersResolver, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
