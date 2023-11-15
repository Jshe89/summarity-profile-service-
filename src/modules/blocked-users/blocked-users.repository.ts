import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/users/user.repository';
import { BlockedUser } from './blocked-user.entity';

@Injectable()
export class BlockedUsersRepository {
  constructor(
    @InjectRepository(BlockedUser)
    private repository: Repository<BlockedUser>,
    private userRepository: UserRepository
  ) { }

  findByPairBlockedIds(initiatorId: string, blockedId: string) {
    return this.repository.findOneBy({ initiatorId, blockedId });
  }

  blockUser(initiatorId: string, blockedId: string): Promise<BlockedUser> {
    return this.repository.save(this.repository.create({
      initiatorId,
      blockedId
    }));
  }

  async unblockUser(blockedUserId: string, authUserId: string): Promise<boolean> {
    const { affected } = await this.repository.delete({ blockedId: blockedUserId, initiatorId: authUserId });
    return !!affected;
  }

  findBlockedProfiles(userId: string) {
    return this.userRepository.getQueryBuilder('u')
      .innerJoin('BlockedUsers', 'b', `b.blockedId = u.id AND b.initiatorId = '${userId}'`)
      .getMany();
  }
}
