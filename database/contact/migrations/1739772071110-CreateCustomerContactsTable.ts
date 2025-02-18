import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerContactsTable1739772071110
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create type contact_method as enum(
        'email',
        'whatsapp',
        'phone_call'
      )
    `);

    await queryRunner.query(`
      create table customer_contacts (
        id int primary key generated always as identity,
        first_name varchar(100) not null,
        last_name varchar(100) not null,
        email varchar(50) not null,
        phone_number varchar(20) not null,
        company varchar(100),
        message text not null,
        preferred_contact_methods contact_method array not null,
        created_at timestamp not null default now(),
        contacted_at timestamp
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table customer_contacts`);

    await queryRunner.query(`drop type contact_method`);
  }
}
