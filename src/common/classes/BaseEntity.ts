import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ description: 'ID of entity' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Creation date of entity' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of entity' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'Soft delete flag of entity', nullable: true })
  @DeleteDateColumn()
  deletedAt?: Date;
}
