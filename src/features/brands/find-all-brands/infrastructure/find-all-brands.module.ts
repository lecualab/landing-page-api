import { BrandsDatabaseModule } from '@features/brands/brands-database';
import { Module } from '@nestjs/common';
import { FindAllBrandsUseCase } from '../application';
import { FIND_ALL_BRANDS_SERVICE } from '../application/ports';
import { FindAllBrandsSqlMapperService } from './find-all-brands-sql-mapper.service';
import { FindAllBrandsSqlService } from './find-all-brands-sql.service';
import { FindAllBrandsController } from './find-all-brands.controller';

@Module({
  imports: [BrandsDatabaseModule],
  controllers: [FindAllBrandsController],
  providers: [
    FindAllBrandsUseCase,
    { provide: FIND_ALL_BRANDS_SERVICE, useClass: FindAllBrandsSqlService },
    FindAllBrandsSqlMapperService,
  ],
})
export class FindAllBrandsModule {}
