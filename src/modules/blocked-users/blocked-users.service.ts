import { Injectable } from '@nestjs/common';
import { UsersService } from '@modules/users/users.service';
import { ContactRepository } from '@modules/contacts/contacts.repository';
import { BlockedUsersRepository } from './blocked-users.repository';
import { BlockedUserOutput } from './dto/blocked-users.output';
import { UnblockedUserOutput } from './dto/unblocked-users.output';
import { SelfBlockError,
  UserNotUnBlockedError,
  UserAlreadyBlockedError,
  UserNotBlockedError } from './blocked-users.errors';

@Injectable()
export class BlockedUsersService {
  constructor(
    private blockedUsersRepository: BlockedUsersRepository,
    private contactsRepository: ContactRepository,
    private usersService: UsersService
  ) {}

  async blockUser(blockedUserId: string, authUserId: string): Promise<BlockedUserOutput> {
    if (authUserId === blockedUserId) {
      throw new SelfBlockError({ blockedUserId });
    }
    const blockedUser = await this.blockedUsersRepository.findByPairBlockedIds(authUserId, blockedUserId);
    if (blockedUser) {
      throw new UserAlreadyBlockedError({ blockedUserId });
    }
    const user = await this.usersService.getUserByIdOrFail(blockedUserId);
    try {
      await this.blockedUsersRepository.blockUser(authUserId, user.id);
      const contact = await this.contactsRepository.findByPairContactsId(authUserId, user.id);
      if (contact) {
        await this.contactsRepository.removeContactById(contact.id);
      }
      return { blocked: true };
    } catch (error) {
      throw new UserNotBlockedError({ blockedUserId });
    }
  }

  async unblockUser(blockedUserId: string, authUserId: string): Promise<UnblockedUserOutput> {
    await this.usersService.getUserByIdOrFail(blockedUserId);
    const blockedUser = await this.blockedUsersRepository.findByPairBlockedIds(authUserId, blockedUserId);
    if (!blockedUser) {
      throw new UserNotBlockedError({ blockedUserId });
    }
    try {
      const unblocked  = await this.blockedUsersRepository.unblockUser(blockedUserId, authUserId);
      return { unblocked };
    } catch (error) {
      throw new UserNotUnBlockedError({ blockedUserId });
    }
  }

  async getBlockedProfiles(authUserId: string) {
    await this.usersService.getUserByIdOrFail(authUserId);
    const blockedUsers  = await this.blockedUsersRepository.findBlockedProfiles(authUserId);
    return { blockedUsers };
  }

  async isUserBlocked(blockedUserId: string, authUserId: string) {
    const blockedUser = await this.blockedUsersRepository.findByPairBlockedIds(authUserId, blockedUserId);
    return !!blockedUser;
  }
}
