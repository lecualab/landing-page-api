import { Module } from '@nestjs/common';
import { ContactModule } from './contact';

@Module({
  imports: [ContactModule],
})
export class FeaturesModule {}
