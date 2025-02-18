import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { validationPipe } from './validation';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useValue: validationPipe,
    },
  ],
})
export class PipesModule {}
