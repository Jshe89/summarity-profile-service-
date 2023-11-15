import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBlockedUsersTable1695156815562 implements MigrationInterface {
  name = 'AddBlockedUsersTable1695156815562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "BlockedUsers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "initiatorId" uuid NOT NULL, "blockedId" uuid NOT NULL, CONSTRAINT "PK_9b73a13670cfc92a7df4e093eeb" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "BlockedUsers" ADD CONSTRAINT "FK_cb6e4f43e90ee2b6c70241d6328" FOREIGN KEY ("initiatorId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "BlockedUsers" ADD CONSTRAINT "FK_49fd7dbfa6469a4ab1bec527063" FOREIGN KEY ("blockedId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "BlockedUsers" DROP CONSTRAINT "FK_49fd7dbfa6469a4ab1bec527063"');
    await queryRunner.query('ALTER TABLE "BlockedUsers" DROP CONSTRAINT "FK_cb6e4f43e90ee2b6c70241d6328"');
    await queryRunner.query('DROP TABLE "BlockedUsers"');
  }
}
