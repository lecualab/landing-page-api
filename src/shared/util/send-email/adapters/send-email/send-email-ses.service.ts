import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Inject, Injectable } from '@nestjs/common';
import { isString } from 'class-validator';
import {
  GENERATE_EMAIL_SERVICE,
  GenerateEmailService,
} from '../../generate-email.port';
import { GetFromEmailService } from '../../get-from-email.service';
import { GetToEmailService } from '../../get-to-email.service';
import { SendEmailDto, SendEmailService } from '../../send-email.port';

@Injectable()
export class SendEmailSesService implements SendEmailService {
  constructor(
    @Inject(GENERATE_EMAIL_SERVICE)
    private readonly generateEmailService: GenerateEmailService,
    private readonly sesClient: SESClient,
    private readonly getFromEmailService: GetFromEmailService,
    private readonly getToEmailService: GetToEmailService,
  ) {}

  async send(sendEmailDto: SendEmailDto): Promise<void> {
    const { subject, body } = await this.generateEmailService.generate({
      template: sendEmailDto.template,
      params: sendEmailDto.params,
    });

    const to = this.getToEmailService.getToEmail(sendEmailDto.to);

    await this.sesClient.send(
      new SendEmailCommand({
        Source: this.getFromEmailService.getFromEmail(sendEmailDto.from),
        Destination: { ToAddresses: isString(to) ? [to] : [...to] },
        Message: {
          Subject: { Data: subject },
          Body: { Html: { Data: body } },
        },
      }),
    );
  }
}
