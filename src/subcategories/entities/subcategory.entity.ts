import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../../categories';
import { Cocktail } from '../../cocktails';
import { BaseEntity } from '../../common';

@Entity('subcategory')
export class SubCategory extends BaseEntity {
  @Column({ length: 256 })
  name: string;

  @Column()
  categoryId: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Category, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Cocktail, (cocktail) => cocktail.subCategory)
  cocktails: Cocktail[];
}
