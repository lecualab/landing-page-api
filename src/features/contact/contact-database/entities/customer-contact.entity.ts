import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactMethod } from '../enums';

@Entity('customer_contacts')
export class CustomerContact {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ name: 'first_name', length: 100 })
  readonly firstName: string;

  @Column({ name: 'last_name', length: 100 })
  readonly lastName: string;

  @Column({ name: 'email', length: 50 })
  readonly email: string;

  @Column({ name: 'phone_number', length: 20 })
  readonly phoneNumber: string;

  @Column({ type: 'varchar', name: 'company', length: 100, nullable: true })
  readonly company: string | null;

  @Column({ name: 'message', type: 'text' })
  readonly message: string;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @Column('enum', {
    array: true,
    name: 'preferred_contact_methods',
    enum: ContactMethod,
    enumName: 'contact_method',
  })
  readonly preferredContactMethods: readonly ContactMethod[];

  @Column({ name: 'contacted_at', nullable: true })
  readonly contactedAt?: Date;
}
