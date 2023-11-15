import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/users/user.repository';
import { Contact } from './contact.entity';

interface ContactRequestInput {
  requesterId: string;
  recipientId: string;
}

@Injectable()
export class ContactRepository {
  constructor(
    @InjectRepository(Contact)
    private repository: Repository<Contact>,
    private userRepository: UserRepository
  ) { }

  async createAndSave(input: ContactRequestInput) {
    return this.repository.save(this.repository.create(input));
  }

  findUserContacts(userId: string) {
    return this.userRepository.getQueryBuilder('u')
      .where(`u.id != '${userId}'`)
      .leftJoinAndSelect('Contacts', 'c1', 'c1.requesterId = u.id')
      .leftJoinAndSelect('Contacts', 'c2', 'c2.recipientId = u.id')
      .where(`c1.recipientId='${userId}' OR c2.requesterId='${userId}'`)
      .getMany();
  }

  findById(contactId: string) {
    return this.repository.findOneBy({ id: contactId });
  }

  findByPairContactsId(userId1: string, userId2: string) {
    return this.repository.findOneBy([
      { requesterId: userId1, recipientId: userId2 },
      { requesterId: userId2, recipientId: userId1 }
    ]);
  }

  async removeContactById(contactId: string): Promise<boolean> {
    const { affected } = await this.repository.delete(contactId);
    return !!affected;
  }
}
