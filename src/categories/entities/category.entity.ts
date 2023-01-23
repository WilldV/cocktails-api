import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common';
import { SubCategory } from '../../subcategories';
import { ApiProperty } from '@nestjs/swagger';

@Entity('category')
export class Category extends BaseEntity {
  @ApiProperty({ example: 'Short cocktails', description: 'Name of category' })
  @Column({ length: 256 })
  name: string;

  @ApiProperty({
    description: 'Description of category',
    nullable: true,
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Subcategories related to category',
    nullable: true,
    required: false,
    isArray: true,
    type: () => [SubCategory],
  })
  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subCategories?: SubCategory[];
}
