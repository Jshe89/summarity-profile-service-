import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { DB_TABLE_NAMES } from '@config/db-tables.config';
import { Base } from '@shared/base/base.entity';
import { User } from '@modules/users/user.entity';

@Entity(DB_TABLE_NAMES.BLOCKED_USERS)
export class BlockedUser extends Base {
  @ManyToOne(() => User)
  @JoinColumn()
  initiator: User;

  @Column()
  initiatorId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  blocked: User;

  @Column()
  blockedId: string;
}
