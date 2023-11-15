import { Base } from '@shared/base/base.entity';
import { User } from '@modules/users/user.entity';
export declare enum CONTACT_STATUS_TYPES {
    REQUESTED = 0,
    ACCEPTED = 1
}
export declare class Contact extends Base {
    requester: User;
    requesterId: string;
    recipient: User;
    recipientId: string;
    status: CONTACT_STATUS_TYPES;
}
