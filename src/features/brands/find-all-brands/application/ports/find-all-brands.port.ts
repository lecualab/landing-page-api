import { FindAllBrandsOutputDto } from '../../domain/dtos';

export type FindAllBrandsDto = FindAllBrandsOutputDto;

export type FindAllBrandsService = Readonly<{
  findAll(): Promise<FindAllBrandsDto>;
}>;

export const FIND_ALL_BRANDS_SERVICE = Symbol('FindAllBrandsService');
