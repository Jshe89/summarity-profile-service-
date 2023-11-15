import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
interface UserCreateInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    title?: string;
}
export declare class UserRepository {
    private repository;
    constructor(repository: Repository<User>);
    createAndSave(userInput: UserCreateInput): Promise<User>;
    findById(id: string): Promise<User>;
    updateById(id: string, input: UpdateProfileInput): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        title?: string;
        passwordHash: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    } & User>;
    findByEmail(email: string): Promise<User>;
    getQueryBuilder(alias?: string): import("typeorm").SelectQueryBuilder<User>;
    getUserProfiles(query: string, userId: string): Promise<User[]>;
}
export {};
