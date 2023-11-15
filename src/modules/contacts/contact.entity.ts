import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { DB_TABLE_NAMES } from '@config/db-tables.config';
import { Base } from '@shared/base/base.entity';
import { User } from '@modules/users/user.entity';

export enum CONTACT_STATUS_TYPES {
  REQUESTED, ACCEPTED
}

@Entity(DB_TABLE_NAMES.CONTACTS)
export class Contact extends Base {
  @ManyToOne(() => User)
  @JoinColumn()
  requester: User;

  @Column()
  requesterId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  recipient: User;

  @Column()
  recipientId: string;

  @Column({
    type: 'enum',
    enum: CONTACT_STATUS_TYPES,
    default: CONTACT_STATUS_TYPES.REQUESTED
  })
  status: CONTACT_STATUS_TYPES;
}
