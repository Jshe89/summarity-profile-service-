import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/users/user.repository';
import { ContactRepository } from './contacts.repository';
import { ContactNotDeletedError, ContactNotFoundError } from './contacts.errors';
import { DeleteContactOutput } from './dto/delete-contact.output';

@Injectable()
export class ContactsService {
  constructor(
    private contactRepository: ContactRepository,
    private userRepository: UserRepository,
  ) {}

  async getProfileContacts(userId: string) {
    const contacts = await this.contactRepository.findUserContacts(userId);
    return { contacts };
  }

  async removeContact(contactId: string): Promise<DeleteContactOutput> {
    const contact = await this.contactRepository.findById(contactId);

    if (!contact) {
      throw new ContactNotFoundError({ contactId });
    }

    try {
      const deleted  = await this.contactRepository.removeContactById(contactId);
      return { deleted };
    } catch (error) {
      throw new ContactNotDeletedError({ contactId });
    }
  }
}
