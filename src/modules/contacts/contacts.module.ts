import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@modules/users/users.module';
import { Contact } from './contact.entity';
import { ContactsResolver } from './contacts.resolver';
import { ContactRepository } from './contacts.repository';
import { ContactsService } from './contacts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact]),
    ConfigModule,
    forwardRef(() => UsersModule),
  ],
  providers: [ContactsService, ContactsResolver, ContactRepository],
  exports: [ContactsService, ContactRepository],
})
export class ContactsModule {}
