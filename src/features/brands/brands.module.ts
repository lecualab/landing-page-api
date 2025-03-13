import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { FindAllBrandsModule } from './find-all-brands';

@Module({
  imports: [
    FindAllBrandsModule,
    RouterModule.register([
      {
        path: 'brands',
        module: FindAllBrandsModule,
      },
    ]),
  ],
})
export class BrandsModule {}
