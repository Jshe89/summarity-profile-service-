"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_TABLE_NAMES = void 0;
exports.DB_TABLE_NAMES = {
    USERS: process.env.DB_TABLE_USERS || 'Users',
    BLOCKED_USERS: process.env.DB_TABLE_BLOCKED_USERS || 'BlockedUsers',
    CONTACTS: process.env.DB_TABLE_CONTACTS || 'Contacts',
    MIGRATIONS: process.env.DB_TABLE_MIGRATIONS || 'Migrations',
};
//# sourceMappingURL=db-tables.config.js.map