import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '@modules/auth/auth.guard';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { AuthUser, IAuthUser } from '@modules/auth/auth-user.decorator';
import { BlockedUsersService } from './blocked-users.service';
import { BlockedUsersUnionOutput } from './dto/blocked-users.output';
import { UnblockedUsersUnionOutput } from './dto/unblocked-users.output';
import { MyBlockedUsersUnionOutput } from './dto/my-blocked-users.output';

@UseInterceptors(ErrorInterceptor)
@Resolver(() => BlockedUsersUnionOutput)
export class BlockedUsersResolver {
  constructor(
    private blockedUsersService: BlockedUsersService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BlockedUsersUnionOutput)
  blockProfile(@Args('profileId') profileId: string, @AuthUser() user: IAuthUser): Promise<typeof BlockedUsersUnionOutput> {
    return this.blockedUsersService.blockUser(profileId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UnblockedUsersUnionOutput)
  unblockProfile(@Args('profileId') profileId: string, @AuthUser() user: IAuthUser): Promise<typeof UnblockedUsersUnionOutput> {
    return this.blockedUsersService.unblockUser(profileId, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => MyBlockedUsersUnionOutput)
  myBlockedProfiles(@AuthUser() user: IAuthUser): Promise<typeof MyBlockedUsersUnionOutput> {
    return this.blockedUsersService.getBlockedProfiles(user.id);
  }
}
