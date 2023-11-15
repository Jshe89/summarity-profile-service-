import { UserRepository } from '@modules/users/user.repository';
import { ContactRepository } from './contacts.repository';
import { DeleteContactOutput } from './dto/delete-contact.output';
export declare class ContactsService {
    private contactRepository;
    private userRepository;
    constructor(contactRepository: ContactRepository, userRepository: UserRepository);
    getProfileContacts(userId: string): Promise<{
        contacts: import("../users/user.entity").User[];
    }>;
    removeContact(contactId: string): Promise<DeleteContactOutput>;
}
