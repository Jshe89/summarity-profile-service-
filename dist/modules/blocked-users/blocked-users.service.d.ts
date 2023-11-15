import { UsersService } from '@modules/users/users.service';
import { ContactRepository } from '@modules/contacts/contacts.repository';
import { BlockedUsersRepository } from './blocked-users.repository';
import { BlockedUserOutput } from './dto/blocked-users.output';
import { UnblockedUserOutput } from './dto/unblocked-users.output';
export declare class BlockedUsersService {
    private blockedUsersRepository;
    private contactsRepository;
    private usersService;
    constructor(blockedUsersRepository: BlockedUsersRepository, contactsRepository: ContactRepository, usersService: UsersService);
    blockUser(blockedUserId: string, authUserId: string): Promise<BlockedUserOutput>;
    unblockUser(blockedUserId: string, authUserId: string): Promise<UnblockedUserOutput>;
    getBlockedProfiles(authUserId: string): Promise<{
        blockedUsers: import("../users/user.entity").User[];
    }>;
    isUserBlocked(blockedUserId: string, authUserId: string): Promise<boolean>;
}
