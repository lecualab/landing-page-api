import { ContactMethod } from '@features/contact/contact-database';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ContactFormInputDto } from '../../domain/dtos';

export class ContactFormRequestDto implements ContactFormInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe' })
  readonly lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com' })
  readonly email: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+56987654321' })
  readonly phoneNumber: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Acme Inc.' })
  readonly company: string | null;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly message: string;

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsEnum(ContactMethod, { each: true })
  @Transform(({ value }: { value: string | string[] }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return [value];
  })
  @ApiProperty({
    enum: ContactMethod,
    isArray: true,
    example: [ContactMethod.EMAIL, ContactMethod.PHONE_CALL],
  })
  readonly preferredContactMethods: readonly ContactMethod[];
}
