import { IsUrl } from 'class-validator';

export class ContactDatabaseConfig {
  @IsUrl({
    protocols: ['postgresql'],
    require_tld: false,
  })
  readonly CONTACT_DATABASE_URL: string;
}
