import { IsUrl } from 'class-validator';

export class BrandsDatabaseConfig {
  @IsUrl({
    protocols: ['postgresql'],
    require_tld: false,
  })
  readonly BRANDS_DATABASE_URL: string;
}
