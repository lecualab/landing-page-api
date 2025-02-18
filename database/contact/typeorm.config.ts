import { join } from 'path';
import { DataSource } from 'typeorm';

const { CONTACT_DATABASE_URL } = process.env;

if (!CONTACT_DATABASE_URL) throw new Error('CONTACT_DATABASE_URL is not set');

export default new DataSource({
  type: 'postgres',
  url: CONTACT_DATABASE_URL,
  entities: ['src/**/contact-database/entities/**'],
  migrations: [join(__dirname, 'migrations/**')],
});
