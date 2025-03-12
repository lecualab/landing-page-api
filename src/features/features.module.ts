import { Module } from '@nestjs/common';
import { BrandsModule } from './brands';
import { ContactModule } from './contact';

@Module({
  imports: [ContactModule, BrandsModule],
})
export class FeaturesModule {}
