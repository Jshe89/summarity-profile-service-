import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddBlockedUsersTable1695156815562 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
