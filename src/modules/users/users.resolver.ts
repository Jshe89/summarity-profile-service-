import { Resolver, Args, Query, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { GqlAuthGuard } from '@modules/auth/auth.guard';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { AuthUser, IAuthUser } from '@modules/auth/auth-user.decorator';
import { BlockedUsersService } from '@modules/blocked-users/blocked-users.service';
import { UsersService } from './users.service';
import { ProfileOutput, ProfileUnionOutput } from './dto/profile.output';
import { UpdateProfileInput } from './dto/update-profile.input';
import { MyProfileUnionOutput } from './dto/my-profile.output';
import { ProfileSearchUnionOutput } from './dto/profile-search.output';

@UseInterceptors(ErrorInterceptor)
@Resolver(() => ProfileOutput)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private blockedUsersService: BlockedUsersService,
  ) {
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProfileUnionOutput)
  profileById(@Args('id') id: string): Promise<typeof ProfileUnionOutput> {
    return this.usersService.getUserByIdOrFail(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => MyProfileUnionOutput)
  myProfile(@AuthUser() user: IAuthUser): Promise<typeof MyProfileUnionOutput> {
    return this.usersService.getUserByIdOrFail(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => MyProfileUnionOutput)
  updateMyProfile(
    @Args('input') input: UpdateProfileInput,
    @AuthUser() user: IAuthUser,
  ): Promise<typeof MyProfileUnionOutput> {
    return this.usersService.updateUserById(user.id, input);
  }

  @ResolveField('isBlocked', () => Boolean)
  isBlocked(@Parent() user: ProfileOutput, @AuthUser() authUser: IAuthUser): Promise<boolean> {
    return this.blockedUsersService.isUserBlocked(user.id, authUser.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => ProfileSearchUnionOutput)
  profileSearch(@Args('query') query: string, @AuthUser() user: IAuthUser): Promise<typeof ProfileSearchUnionOutput> {
    return this.usersService.getProfiles(query, user.id);
  }
}
