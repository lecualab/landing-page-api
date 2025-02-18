import { DataSourceOptions } from 'typeorm';

const { CONTACT_DATABASE_URL } = process.env;

if (!CONTACT_DATABASE_URL) throw new Error('CONTACT_DATABASE_URL is not set');

export const BASE_CONFIG: DataSourceOptions = {
  type: 'postgres',
  url: CONTACT_DATABASE_URL,
};
