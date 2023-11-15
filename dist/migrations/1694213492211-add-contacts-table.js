"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddContactsTable1694213492211 = void 0;
class AddContactsTable1694213492211 {
    constructor() {
        this.name = 'AddContactsTable1694213492211';
    }
    async up(queryRunner) {
        await queryRunner.query('CREATE TYPE "public"."Contacts_status_enum" AS ENUM(\'0\', \'1\')');
        await queryRunner.query('CREATE TABLE "Contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "requesterId" uuid NOT NULL, "recipientId" uuid NOT NULL, "status" "public"."Contacts_status_enum" NOT NULL DEFAULT \'0\', CONSTRAINT "PK_68782cec65c8eef577c62958273" PRIMARY KEY ("id"))');
        await queryRunner.query('ALTER TABLE "Contacts" ADD CONSTRAINT "FK_aace6fd3f87a15fa7ed805f58cd" FOREIGN KEY ("requesterId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "Contacts" ADD CONSTRAINT "FK_21a0f5b4886108986b02c07685f" FOREIGN KEY ("recipientId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "Contacts" DROP CONSTRAINT "FK_21a0f5b4886108986b02c07685f"');
        await queryRunner.query('ALTER TABLE "Contacts" DROP CONSTRAINT "FK_aace6fd3f87a15fa7ed805f58cd"');
        await queryRunner.query('DROP TABLE "Contacts"');
        await queryRunner.query('DROP TYPE "public"."Contacts_status_enum"');
    }
}
exports.AddContactsTable1694213492211 = AddContactsTable1694213492211;
//# sourceMappingURL=1694213492211-add-contacts-table.js.map