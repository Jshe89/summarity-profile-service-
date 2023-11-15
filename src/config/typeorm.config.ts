import * as path from 'path';
import { DataSource } from 'typeorm';
import { Contact } from '@modules/contacts/contact.entity';
import { User } from '@modules/users/user.entity';
import { BlockedUser } from '@modules/blocked-users/blocked-user.entity';
import config from './configuration';
import { DB_TABLE_NAMES } from './db-tables.config';

export default new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [Contact, User, BlockedUser],
  migrationsTableName: DB_TABLE_NAMES.MIGRATIONS,
  migrations: [path.resolve(__dirname, '../migrations/*')]
});
