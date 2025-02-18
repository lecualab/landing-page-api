import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthDto } from './dtos';

@ApiTags('Health')
@Controller({ path: 'health', version: '' })
export class HealthController {
  @Get()
  getHealth(): HealthDto {
    return { status: 'OK' };
  }
}
