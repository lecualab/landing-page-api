import { Inject, Injectable } from '@nestjs/common';
import { ContactFormInputDto } from '../domain/dtos';
import {
  NOTIFY_CONTACT_SERVICE,
  NotifyContactService,
  SAVE_CONTACT_SERVICE,
  SaveContactService,
} from './ports';

@Injectable()
export class ContactFormUseCase {
  constructor(
    @Inject(SAVE_CONTACT_SERVICE)
    private readonly saveContactService: SaveContactService,
    @Inject(NOTIFY_CONTACT_SERVICE)
    private readonly notifyContactService: NotifyContactService,
  ) {}

  async execute(input: ContactFormInputDto): Promise<void> {
    await this.saveContactService.saveContact({ ...input });

    await this.notifyContactService.notifyContact({
      email: input.email,
      firstName: input.firstName,
    });
  }
}
