import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ContactFormModule } from './contact-form';

@Module({
  imports: [
    ContactFormModule,
    RouterModule.register([
      {
        path: 'contact',
        module: ContactFormModule,
      },
    ]),
  ],
})
export class ContactModule {}
