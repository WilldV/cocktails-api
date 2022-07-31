import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common';
import { SubCategory } from '../../subcategories';

@Entity('category')
export class Category extends BaseEntity {
  @Column({ length: 256 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => SubCategory, (subcategory) => subcategory.category)
  subCategories: SubCategory[];
}
