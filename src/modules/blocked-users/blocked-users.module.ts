import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@modules/users/users.module';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { BlockedUser } from './blocked-user.entity';
import { BlockedUsersResolver } from './blocked-users.resolver';
import { BlockedUsersRepository } from './blocked-users.repository';
import { BlockedUsersService } from './blocked-users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlockedUser]),
    ConfigModule,
    forwardRef(() => ContactsModule),
    forwardRef(() => UsersModule)
  ],
  providers: [BlockedUsersService, BlockedUsersResolver, BlockedUsersRepository],
  exports: [BlockedUsersService, BlockedUsersRepository],
})
export class BlockedUsersModule {}
