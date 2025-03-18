import { Injectable } from '@nestjs/common';
import { isString } from 'class-validator';
import { ToEmail } from './enums';
import { SendEmailToConfig } from './send-email-to.config';
import { SendEmailDto } from './send-email.port';

@Injectable()
export class GetToEmailService {
  constructor(private readonly sendEmailToConfig: SendEmailToConfig) {}

  // eslint-disable-next-line sonarjs/function-return-type
  getToEmail(to: SendEmailDto['to']): string | readonly string[] {
    if (!this.isPredefinedToEmail(to)) return to;

    return this.sendEmailToConfig[to];
  }

  private isPredefinedToEmail(to: SendEmailDto['to']): to is ToEmail {
    return isString(to) && Object.keys(ToEmail).includes(to as ToEmail);
  }
}
