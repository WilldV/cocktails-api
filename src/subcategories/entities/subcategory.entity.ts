import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories';
import { Cocktail } from '../../cocktails';
import { BaseEntity } from '../../common';
import { ApiProperty } from '@nestjs/swagger';

@Entity('subcategory')
export class SubCategory extends BaseEntity {
  @ApiProperty({ description: 'Name of subcategory' })
  @Column({ length: 256 })
  name: string;

  @ApiProperty({ description: "Subcategory's category ID" })
  @Column()
  categoryId: number;

  @ApiProperty({
    description: 'Description of subcategory',
    nullable: true,
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: "Subcategory's category",
    nullable: true,
    required: false,
    type: () => Category,
  })
  @ManyToOne(() => Category, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  @ApiProperty({
    description: 'Cocktails related to subcategory',
    nullable: true,
    required: false,
    isArray: true,
    type: () => [Cocktail],
  })
  @OneToMany(() => Cocktail, (cocktail) => cocktail.subCategory)
  cocktails?: Cocktail[];
}
