import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Inject, Injectable } from '@nestjs/common';
import { NotifyContactDto, NotifyContactService } from '../application';
import { NotifyContactConfig } from './notify-contact.config';

@Injectable()
export class NotifyContactSesService implements NotifyContactService {
  constructor(
    @Inject(SESClient)
    private readonly sesClient: SESClient,
    private readonly notifyContactConfig: NotifyContactConfig,
  ) {}

  // TODO: Create a microservice
  async notifyContact({ email, firstName }: NotifyContactDto): Promise<void> {
    await this.sesClient.send(
      new SendEmailCommand({
        Source: this.notifyContactConfig.NOTIFY_CONTACT_FROM_EMAIL,
        Destination: {
          ToAddresses: [email],
          BccAddresses: [...this.notifyContactConfig.NOTIFY_CONTACT_BCC_EMAILS],
        },
        ReplyToAddresses: [
          ...this.notifyContactConfig.NOTIFY_CONTACT_REPLAY_TO_EMAILS,
        ],
        Message: {
          Subject: {
            Data: `Hemos recibido tu solicitud de contacto 🦆`,
          },
          Body: {
            Html: {
              Data: `
                <p>
                  Hola ${firstName}, dentro de poco nos pondremos en contacto contigo.
                </p>
              `,
            },
          },
        },
      }),
    );
  }
}
