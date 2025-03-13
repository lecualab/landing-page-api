import { Brand, BRANDS_DATABASE } from '@features/brands/brands-database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllBrandsDto, FindAllBrandsService } from '../application/ports';
import { FindAllBrandsSqlMapperService } from './find-all-brands-sql-mapper.service';

@Injectable()
export class FindAllBrandsSqlService implements FindAllBrandsService {
  constructor(
    @InjectRepository(Brand, BRANDS_DATABASE)
    private readonly brandRepository: Repository<Brand>,
    private readonly findAllBrandsSqlMapperService: FindAllBrandsSqlMapperService,
  ) {}

  async findAll(): Promise<FindAllBrandsDto> {
    const brands = await this.brandRepository.find();

    return brands.map((brand) => this.findAllBrandsSqlMapperService.map(brand));
  }
}
