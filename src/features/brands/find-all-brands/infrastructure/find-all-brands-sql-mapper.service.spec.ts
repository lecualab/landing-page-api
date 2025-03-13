import { Brand } from '@features/brands/brands-database';
import { TestBed } from '@suites/unit';
import { FindAllBrandsSqlMapperService } from './find-all-brands-sql-mapper.service';

describe('FindAllBrandsSqlMapperService', () => {
  let underTest: FindAllBrandsSqlMapperService;

  beforeEach(async () => {
    const { unit } = await TestBed.solitary(
      FindAllBrandsSqlMapperService,
    ).compile();

    underTest = unit;
  });

  describe('map', () => {
    it('should map the brand', () => {
      const actual = underTest.map({
        id: 'id' as any,
        name: 'name',
        imageUrl: 'image-url',
        websiteUrl: 'website-url',
      } as Brand);

      expect(actual).toMatchInlineSnapshot(`
{
  "id": "id",
  "imageUrl": "image-url",
  "name": "name",
  "websiteUrl": "website-url",
}
`);
    });

    describe('when the brand does not have a website url', () => {
      it('should map the website as `undefined`', () => {
        const actual = underTest.map({} as Brand);

        expect(actual.websiteUrl).toBeUndefined();
      });
    });
  });
});
