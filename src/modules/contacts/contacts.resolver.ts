import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '@modules/auth/auth.guard';
import { AuthUser, IAuthUser } from '@modules/auth/auth-user.decorator';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { ContactsService } from './contacts.service';
import { ProfileContactsUnionOutput } from './dto/profile-contacts.output';
import { DeleteContactUnionOutput } from './dto/delete-contact.output';

@UseInterceptors(ErrorInterceptor)
@Resolver(() => ProfileContactsUnionOutput)
export class ContactsResolver {
  constructor(
    private contactsService: ContactsService,
  ) {
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProfileContactsUnionOutput)
  profileContacts(@Args('id') id: string): Promise<typeof ProfileContactsUnionOutput> {
    return this.contactsService.getProfileContacts(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProfileContactsUnionOutput)
  myProfileContacts(@AuthUser() user: IAuthUser): Promise<typeof ProfileContactsUnionOutput> {
    return this.contactsService.getProfileContacts(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteContactUnionOutput)
  deleteContact(@Args('contactId') contactId: string): Promise<typeof DeleteContactUnionOutput> {
    return this.contactsService.removeContact(contactId);
  }
}
