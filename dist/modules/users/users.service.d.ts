import { UserRepository } from './user.repository';
import { UpdateProfileInput } from './dto/update-profile.input';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getUserByIdOrFail(id: string): Promise<import("./user.entity").User>;
    updateUserById(id: string, input: UpdateProfileInput): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        title?: string;
        passwordHash: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    } & import("./user.entity").User>;
    getProfiles(query: string, id: string): Promise<{
        profiles: import("./user.entity").User[];
    }>;
}
