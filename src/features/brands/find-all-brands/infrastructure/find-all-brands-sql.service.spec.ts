import { Brand, BRANDS_DATABASE } from '@features/brands/brands-database';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Mocked, TestBed } from '@suites/unit';
import { Repository } from 'typeorm';
import { FindAllBrandsSqlMapperService } from './find-all-brands-sql-mapper.service';
import { FindAllBrandsSqlService } from './find-all-brands-sql.service';

describe('FindAllBrandsSqlService', () => {
  let underTest: FindAllBrandsSqlService;
  let brandRepository: Mocked<Repository<Brand>>;
  let findAllBrandsSqlMapperService: Mocked<FindAllBrandsSqlMapperService>;

  beforeEach(async () => {
    const { unit, unitRef } = await TestBed.solitary(
      FindAllBrandsSqlService,
    ).compile();

    underTest = unit;
    brandRepository = unitRef.get(
      getRepositoryToken(Brand, BRANDS_DATABASE) as string,
    );
    findAllBrandsSqlMapperService = unitRef.get(FindAllBrandsSqlMapperService);
  });

  describe('findAll', () => {
    beforeEach(() => {
      brandRepository.find.mockResolvedValue([]);

      findAllBrandsSqlMapperService.map.mockImplementation(
        (brand) => `mapped-${brand}` as any,
      );
    });

    it('should return all brands mapped', async () => {
      brandRepository.find.mockResolvedValueOnce(['brand-1', 'brand-2'] as any);

      const actual = await underTest.findAll();

      expect(actual).toMatchInlineSnapshot(`
[
  "mapped-brand-1",
  "mapped-brand-2",
]
`);
    });
  });
});
