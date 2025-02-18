import { Inject, Injectable } from '@nestjs/common';
import { ContactFormInputDto } from '../domain/dtos';
import { SAVE_CONTACT_SERVICE, SaveContactService } from './ports';

@Injectable()
export class ContactFormUseCase {
  constructor(
    @Inject(SAVE_CONTACT_SERVICE)
    private readonly saveContactService: SaveContactService,
  ) {}

  async execute(input: ContactFormInputDto): Promise<void> {
    await this.saveContactService.saveContact(input);
  }
}
