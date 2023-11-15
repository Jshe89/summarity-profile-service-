import { IAuthUser } from '@modules/auth/auth-user.decorator';
import { BlockedUsersService } from './blocked-users.service';
import { BlockedUsersUnionOutput } from './dto/blocked-users.output';
import { UnblockedUsersUnionOutput } from './dto/unblocked-users.output';
import { MyBlockedUsersUnionOutput } from './dto/my-blocked-users.output';
export declare class BlockedUsersResolver {
    private blockedUsersService;
    constructor(blockedUsersService: BlockedUsersService);
    blockProfile(profileId: string, user: IAuthUser): Promise<typeof BlockedUsersUnionOutput>;
    unblockProfile(profileId: string, user: IAuthUser): Promise<typeof UnblockedUsersUnionOutput>;
    myBlockedProfiles(user: IAuthUser): Promise<typeof MyBlockedUsersUnionOutput>;
}
