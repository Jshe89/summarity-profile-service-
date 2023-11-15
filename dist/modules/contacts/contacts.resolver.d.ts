import { IAuthUser } from '@modules/auth/auth-user.decorator';
import { ContactsService } from './contacts.service';
import { ProfileContactsUnionOutput } from './dto/profile-contacts.output';
import { DeleteContactUnionOutput } from './dto/delete-contact.output';
export declare class ContactsResolver {
    private contactsService;
    constructor(contactsService: ContactsService);
    profileContacts(id: string): Promise<typeof ProfileContactsUnionOutput>;
    myProfileContacts(user: IAuthUser): Promise<typeof ProfileContactsUnionOutput>;
    deleteContact(contactId: string): Promise<typeof DeleteContactUnionOutput>;
}
