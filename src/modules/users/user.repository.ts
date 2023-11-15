import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateProfileInput } from './dto/update-profile.input';

interface UserCreateInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  title?: string;
}

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createAndSave(userInput: UserCreateInput) {
    const { password, ...input } = userInput;
    const passwordHash = await hash(password, 10);
    return this.repository.save(this.repository.create({
      passwordHash,
      ...input
    }));
  }

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async updateById(id: string, input: UpdateProfileInput) {
    const userToSave = await this.repository.findOneBy({ id });
    return this.repository.save({
      id,
      ...userToSave,
      ...input,
    });
  }

  findByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  getQueryBuilder(alias = 'u') {
    return this.repository.createQueryBuilder(alias);
  }

  getUserProfiles(query: string, userId: string) {
    const blockedUsersSubQuery = this.repository.createQueryBuilder('blockedUsers')
      .where('blockedUser.blockedId = :blockedId', { blockedId: userId });

    return this.repository.createQueryBuilder('u')
      .leftJoinAndSelect('Contacts', 'c1', `c1.requesterId = u.id AND c1.recipientId = '${userId}'`)
      .leftJoinAndSelect('Contacts', 'c2',  `c2.recipientId = u.id AND c2.requesterId = '${userId}'`)
      .where('user.id NOT IN (:blockedId)', {
        blockedId: blockedUsersSubQuery,
      })
      .andWhere('(u.firstName LIKE :query OR u.lastName LIKE :query)', { query: `%${query}%` })
      .orderBy({ 'с1.id': 'DESC', 'с2.id': 'DESC' })
      .orderBy({ 'u.firstName': 'ASC', 'u.lastName': 'ASC' })
      .getMany();
  }
}
