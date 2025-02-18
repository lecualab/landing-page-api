import { join } from 'path';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.CONTACT_DATABASE_URL,
  entities: ['src/**/contact-database/entities/**'],
  migrations: [join(__dirname, 'migrations/**')],
  ssl: { rejectUnauthorized: false },
});
