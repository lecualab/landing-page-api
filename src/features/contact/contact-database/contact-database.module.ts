import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypedConfigModule, dotenvLoader } from 'nest-typed-config';
import { ContactDatabaseConfig } from './contact-database.config';
import * as Entities from './entities';

export const CONTACT_DATABASE = 'CONTACT_DATABASE';

const ENTITIES = Object.values(Entities);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: CONTACT_DATABASE,
      imports: [
        TypedConfigModule.forRoot({
          schema: ContactDatabaseConfig,
          load: dotenvLoader(),
        }),
      ],
      inject: [ContactDatabaseConfig],
      useFactory: (contactDatabaseConfig: ContactDatabaseConfig) => ({
        type: 'postgres',
        url: contactDatabaseConfig.CONTACT_DATABASE_URL,
        entities: [...ENTITIES],
      }),
    }),
    TypeOrmModule.forFeature([...ENTITIES], CONTACT_DATABASE),
  ],
  exports: [TypeOrmModule],
})
export class ContactDatabaseModule {}
