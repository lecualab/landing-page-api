import { join } from 'path';
import { DataSource } from 'typeorm';
import { createDataSourceOptions } from '../utils';

if (!process.env.CONTACT_DATABASE_URL)
  throw new Error('CONTACT_DATABASE_URL is not set');

export default createDataSourceOptions(process.env.CONTACT_DATABASE_URL).then(
  (dataSourceOptions) =>
    new DataSource({
      ...dataSourceOptions,
      entities: ['src/**/contact-database/entities/**'],
      migrations: [join(__dirname, 'migrations/**')],
    }),
);
