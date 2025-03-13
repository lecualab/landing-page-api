import { FindAllBrandsOutputDto } from '../../domain/dtos';

type ResponseDto = FindAllBrandsOutputDto[number];

export class FindAllBrandsResponseDto implements ResponseDto {
  id: number;
  name: string;
  imageUrl: string;
  websiteUrl?: string;
}
