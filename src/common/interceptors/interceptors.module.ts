import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { StandardizeResponseInterceptor } from './standardize-response';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: StandardizeResponseInterceptor,
    },
  ],
})
export class InterceptorsModule {}
