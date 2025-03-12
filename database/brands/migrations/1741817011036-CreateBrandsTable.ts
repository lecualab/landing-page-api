import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBrandsTable1741817011036 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table if not exists brands (
        id int primary key generated always as identity,
        name varchar unique not null,
        image_url varchar not null,
        website_url varchar,
        created_at timestamp not null default now(),
        deleted_at timestamp
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table brands`);
  }
}
