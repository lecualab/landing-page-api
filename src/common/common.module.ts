import { Module } from '@nestjs/common';
import { HealthModule } from './health';
import { InterceptorsModule } from './interceptors';
import { PipesModule } from './pipes';

@Module({
  imports: [HealthModule, PipesModule, InterceptorsModule],
})
export class CommonModule {}
