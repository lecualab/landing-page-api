import { join } from 'path';
import { DataSource } from 'typeorm';
import { BASE_CONFIG } from './typeorm.base.config';

export default new DataSource({
  ...BASE_CONFIG,
  entities: ['src/**/contact-database/entities/**'],
  migrations: [join(__dirname, 'migrations/**')],
});
