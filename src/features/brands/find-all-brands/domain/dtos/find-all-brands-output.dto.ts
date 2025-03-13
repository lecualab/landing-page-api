import { Brand } from '@features/brands/brands-database';

export type FindAllBrandsOutputDto = readonly Readonly<
  Pick<Brand, 'id' | 'name' | 'imageUrl'> & {
    websiteUrl?: string;
  }
>[];
