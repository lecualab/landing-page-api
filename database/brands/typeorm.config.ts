import { join } from 'path';
import { DataSource } from 'typeorm';

const { BRANDS_DATABASE_URL } = process.env;

if (!BRANDS_DATABASE_URL) throw new Error('BRANDS_DATABASE_URL is not set');

export default new DataSource({
  type: 'postgres',
  url: BRANDS_DATABASE_URL,
  entities: ['src/**/brands-database/entities/**'],
  migrations: [join(__dirname, 'migrations/**')],
});
