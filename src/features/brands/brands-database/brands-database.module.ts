import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { BrandsDatabaseConfig } from './brands-database.config';
import * as Entities from './entities';

export const BRANDS_DATABASE = 'BRANDS_DATABASE';

const ENTITIES = Object.values(Entities);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: BRANDS_DATABASE,
      imports: [
        TypedConfigModule.forRoot({
          schema: BrandsDatabaseConfig,
          load: dotenvLoader(),
        }),
      ],
      inject: [BrandsDatabaseConfig],
      useFactory: (brandsDatabaseConfig: BrandsDatabaseConfig) => ({
        type: 'postgres',
        url: brandsDatabaseConfig.BRANDS_DATABASE_URL,
        entities: [...ENTITIES],
      }),
    }),
    TypeOrmModule.forFeature([...ENTITIES], BRANDS_DATABASE),
  ],
  exports: [TypeOrmModule],
})
export class BrandsDatabaseModule {}
