import { DataSourceOptions } from 'typeorm';

const { BRANDS_DATABASE_URL } = process.env;

if (!BRANDS_DATABASE_URL) throw new Error('BRANDS_DATABASE_URL is not set');

export const BASE_CONFIG: DataSourceOptions = {
  type: 'postgres',
  url: BRANDS_DATABASE_URL,
};
