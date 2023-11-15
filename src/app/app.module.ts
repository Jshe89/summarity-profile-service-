import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '@modules/auth/auth.module';
import { CommonModule } from '@modules/common/common.module';
import { ContactsModule } from '@modules/contacts/contacts.module';
import { UsersModule } from '@modules/users/users.module';
import { BlockedUsersModule } from '@modules/blocked-users/blocked-users.module';
import { AppGlobalModule } from './app-global.module';

@Module({
  imports: [
    AppGlobalModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CommonModule),
    forwardRef(() => ContactsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => BlockedUsersModule),
  ],
  exports: [AppGlobalModule]
})
export class AppModule {}
