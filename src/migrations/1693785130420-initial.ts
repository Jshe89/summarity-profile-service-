import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1693785130420 implements MigrationInterface {
  name = 'Initial1693785130420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying(32) NOT NULL, "lastName" character varying(32) NOT NULL, "email" character varying(64) NOT NULL, "passwordHash" character varying(128) NOT NULL, "title" character varying(128), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "Users"');
  }
}
