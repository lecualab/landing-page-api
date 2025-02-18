import { join } from 'path';
import { DataSource } from 'typeorm';
import { BASE_CONFIG } from './typeorm.base.config';

export default new DataSource({
  ...BASE_CONFIG,
  migrations: [join(__dirname, 'seeds/**')],
  migrationsTableName: 'seeds',
});
