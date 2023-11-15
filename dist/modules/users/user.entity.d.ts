import { Base } from '@shared/base/base.entity';
export declare class User extends Base {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    title?: string;
}
