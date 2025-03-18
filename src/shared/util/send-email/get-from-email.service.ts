import { Injectable } from '@nestjs/common';
import { SendEmailResendDto } from './adapters/send-email';
import { SendEmailFromConfig } from './send-email-from.config';
import { SendEmailDto } from './send-email.port';

@Injectable()
export class GetFromEmailService {
  constructor(private readonly sendEmailFromConfig: SendEmailFromConfig) {}

  getFromEmail(from: SendEmailDto['from']): SendEmailResendDto['from'] {
    return this.sendEmailFromConfig[from];
  }
}
