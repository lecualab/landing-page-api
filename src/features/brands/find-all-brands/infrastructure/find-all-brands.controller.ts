import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { FindAllBrandsUseCase } from '../application';
import { FindAllBrandsResponseDto } from './dtos';

@Controller()
export class FindAllBrandsController {
  constructor(private readonly findAllBrandsUseCase: FindAllBrandsUseCase) {}

  @Get()
  @ApiResponse({
    description: 'Returns all brands we have worked with',
    status: HttpStatus.OK,
    type: FindAllBrandsResponseDto,
    isArray: true,
  })
  findAll() {
    return this.findAllBrandsUseCase.execute();
  }
}
