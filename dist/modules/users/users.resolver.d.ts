import { IAuthUser } from '@modules/auth/auth-user.decorator';
import { BlockedUsersService } from '@modules/blocked-users/blocked-users.service';
import { UsersService } from './users.service';
import { ProfileOutput, ProfileUnionOutput } from './dto/profile.output';
import { UpdateProfileInput } from './dto/update-profile.input';
import { MyProfileUnionOutput } from './dto/my-profile.output';
import { ProfileSearchUnionOutput } from './dto/profile-search.output';
export declare class UsersResolver {
    private usersService;
    private blockedUsersService;
    constructor(usersService: UsersService, blockedUsersService: BlockedUsersService);
    profileById(id: string): Promise<typeof ProfileUnionOutput>;
    myProfile(user: IAuthUser): Promise<typeof MyProfileUnionOutput>;
    updateMyProfile(input: UpdateProfileInput, user: IAuthUser): Promise<typeof MyProfileUnionOutput>;
    isBlocked(user: ProfileOutput, authUser: IAuthUser): Promise<boolean>;
    profileSearch(query: string, user: IAuthUser): Promise<typeof ProfileSearchUnionOutput>;
}
