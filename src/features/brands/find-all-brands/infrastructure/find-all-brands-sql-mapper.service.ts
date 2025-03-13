import { Brand } from '@features/brands/brands-database';
import { Injectable } from '@nestjs/common';
import { FindAllBrandsOutputDto } from '../domain/dtos';

@Injectable()
export class FindAllBrandsSqlMapperService {
  map(brand: Brand): FindAllBrandsOutputDto[number] {
    return {
      id: brand.id,
      name: brand.name,
      imageUrl: brand.imageUrl,
      websiteUrl: brand.websiteUrl ?? undefined,
    };
  }
}
