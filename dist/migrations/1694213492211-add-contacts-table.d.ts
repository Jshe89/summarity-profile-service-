import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddContactsTable1694213492211 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
