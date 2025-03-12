import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ unique: true })
  readonly name: string;

  @Column({ name: 'image_url' })
  readonly imageUrl: string;

  @Column({ name: 'website_url', type: 'varchar', nullable: true })
  readonly websiteUrl: string | null;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  readonly deletedAt: Date | null;
}
