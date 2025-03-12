import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertBrands1743179328495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into brands (name, image_url, website_url)
        values
        ('Brand 1', 'https://placehold.co/216x84/1DADB5/white?text=Brand+1', 'https://example.com/1'),
        ('Brand 2', 'https://placehold.co/216x84/F28F31/white?text=Brand+2', 'https://example.com/2'),
        ('Brand 3', 'https://placehold.co/216x84/AA4465/white?text=Brand+3', 'https://example.com/3'),
        ('Brand 4', 'https://placehold.co/216x84/EEE5E9/gray?text=Brand+4', 'https://example.com/4');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('delete from brands');
  }
}
