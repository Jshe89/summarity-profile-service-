import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserNotFoundError } from './user.errors';
import { UpdateProfileInput } from './dto/update-profile.input';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async getUserByIdOrFail(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError({ id });
    }
    return user;
  }

  async updateUserById(id: string, input: UpdateProfileInput) {
    return await this.userRepository.updateById(id, input);
  }

  async getProfiles(query: string, id: string) {
    const profiles  = await this.userRepository.getUserProfiles(query, id);
    return { profiles };
  }
}
