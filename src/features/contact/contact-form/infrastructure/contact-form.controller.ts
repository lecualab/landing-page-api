import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactFormUseCase } from '../application';
import { ContactFormRequestDto } from './dtos';

@ApiTags('Contact')
@Controller()
export class ContactFormController {
  constructor(private readonly contactFormUseCase: ContactFormUseCase) {}

  @Post()
  async contact(@Body() contactFormRequestDto: ContactFormRequestDto) {
    await this.contactFormUseCase.execute(contactFormRequestDto);
  }
}
