import { Repository } from 'typeorm';
import { UserRepository } from '@modules/users/user.repository';
import { BlockedUser } from './blocked-user.entity';
export declare class BlockedUsersRepository {
    private repository;
    private userRepository;
    constructor(repository: Repository<BlockedUser>, userRepository: UserRepository);
    findByPairBlockedIds(initiatorId: string, blockedId: string): Promise<BlockedUser>;
    blockUser(initiatorId: string, blockedId: string): Promise<BlockedUser>;
    unblockUser(blockedUserId: string, authUserId: string): Promise<boolean>;
    findBlockedProfiles(userId: string): Promise<import("../users/user.entity").User[]>;
}
