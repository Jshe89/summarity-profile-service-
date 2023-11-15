import { Column, Entity } from 'typeorm';
import { DB_TABLE_NAMES } from '@config/db-tables.config';
import { Base } from '@shared/base/base.entity';

@Entity(DB_TABLE_NAMES.USERS)
export class User extends Base {
  @Column({
    type: 'varchar',
    length: 32
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 32
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 64,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128
  })
  passwordHash: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true
  })
  title?: string;
}
