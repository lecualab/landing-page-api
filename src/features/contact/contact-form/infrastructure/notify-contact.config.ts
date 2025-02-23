import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  ValidationOptions,
} from 'class-validator';

const IsLecualabEmail = (validationOptions: ValidationOptions = {}) =>
  IsEmail({ host_whitelist: ['lecualab.com'] }, validationOptions);

export class NotifyContactConfig {
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsLecualabEmail({ each: true })
  readonly NOTIFY_CONTACT_REPLAY_TO_EMAILS: readonly string[];

  @IsLecualabEmail()
  readonly NOTIFY_CONTACT_FROM_EMAIL: string;

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsLecualabEmail({ each: true })
  readonly NOTIFY_CONTACT_BCC_EMAILS: readonly string[];
}
