import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Inject, Injectable } from '@nestjs/common';
import { NotifyContactDto, NotifyContactService } from '../application';

@Injectable()
export class NotifyContactSesService implements NotifyContactService {
  constructor(
    @Inject(SESClient)
    private readonly sesClient: SESClient,
  ) {}

  // TODO: Create a microservice
  async notifyContact({ email, firstName }: NotifyContactDto): Promise<void> {
    await this.sesClient.send(
      new SendEmailCommand({
        Source: 'hola@lecualab.com',
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Subject: {
            Data: `Hemos recibido tu solicitud de contacto 🚀`,
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
