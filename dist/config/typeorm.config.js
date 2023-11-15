"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const typeorm_1 = require("typeorm");
const contact_entity_1 = require("../modules/contacts/contact.entity");
const user_entity_1 = require("../modules/users/user.entity");
const blocked_user_entity_1 = require("../modules/blocked-users/blocked-user.entity");
const configuration_1 = require("./configuration");
const db_tables_config_1 = require("./db-tables.config");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: configuration_1.default.database.host,
    port: configuration_1.default.database.port,
    username: configuration_1.default.database.username,
    password: configuration_1.default.database.password,
    database: configuration_1.default.database.database,
    entities: [contact_entity_1.Contact, user_entity_1.User, blocked_user_entity_1.BlockedUser],
    migrationsTableName: db_tables_config_1.DB_TABLE_NAMES.MIGRATIONS,
    migrations: [path.resolve(__dirname, '../migrations/*')]
});
//# sourceMappingURL=typeorm.config.js.map