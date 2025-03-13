import { Inject, Injectable } from '@nestjs/common';
import { FindAllBrandsOutputDto } from '../domain/dtos';
import { FIND_ALL_BRANDS_SERVICE, FindAllBrandsService } from './ports';

@Injectable()
export class FindAllBrandsUseCase {
  constructor(
    @Inject(FIND_ALL_BRANDS_SERVICE)
    private readonly findAllBrandsService: FindAllBrandsService,
  ) {}

  execute(): Promise<FindAllBrandsOutputDto> {
    return this.findAllBrandsService.findAll();
  }
}
