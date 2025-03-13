import { Mocked, TestBed } from '@suites/unit';
import { FindAllBrandsUseCase } from './find-all-brands.use-case';
import { FIND_ALL_BRANDS_SERVICE, FindAllBrandsService } from './ports';

describe('FindAllBrandsUseCase', () => {
  let underTest: FindAllBrandsUseCase;
  let findAllBrandsService: Mocked<FindAllBrandsService>;

  beforeEach(async () => {
    const { unit, unitRef } =
      await TestBed.solitary(FindAllBrandsUseCase).compile();

    underTest = unit;
    findAllBrandsService = unitRef.get(FIND_ALL_BRANDS_SERVICE);
  });

  describe('execute', () => {
    it('should return all brands', async () => {
      findAllBrandsService.findAll.mockResolvedValue([
        'brand-1',
        'brand-2',
      ] as any);

      const actual = await underTest.execute();

      expect(actual).toMatchInlineSnapshot(`
[
  "brand-1",
  "brand-2",
]
`);
    });
  });
});
