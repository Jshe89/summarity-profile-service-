import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class Initial1693785130420 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
