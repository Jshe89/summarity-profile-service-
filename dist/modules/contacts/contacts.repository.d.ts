import { Repository } from 'typeorm';
import { UserRepository } from '@modules/users/user.repository';
import { Contact } from './contact.entity';
interface ContactRequestInput {
    requesterId: string;
    recipientId: string;
}
export declare class ContactRepository {
    private repository;
    private userRepository;
    constructor(repository: Repository<Contact>, userRepository: UserRepository);
    createAndSave(input: ContactRequestInput): Promise<Contact>;
    findUserContacts(userId: string): Promise<import("../users/user.entity").User[]>;
    findById(contactId: string): Promise<Contact>;
    findByPairContactsId(userId1: string, userId2: string): Promise<Contact>;
    removeContactById(contactId: string): Promise<boolean>;
}
export {};
