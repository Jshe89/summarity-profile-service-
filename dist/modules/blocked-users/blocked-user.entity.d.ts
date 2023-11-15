import { Base } from '@shared/base/base.entity';
import { User } from '@modules/users/user.entity';
export declare class BlockedUser extends Base {
    initiator: User;
    initiatorId: string;
    blocked: User;
    blockedId: string;
}
