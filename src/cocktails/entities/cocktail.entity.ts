import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common';
import { Step } from '../../steps';
import { SubCategory } from '../../subcategories';

export enum AlcoholLevel {
  ZERO,
  LOW,
  MEDIUM,
  HIGH,
}

@Entity('cocktail')
export class Cocktail extends BaseEntity {
  @Column({ length: 256 })
  name: string;

  @Column()
  subCategoryId: number;

  @Column({ type: 'enum', enum: AlcoholLevel })
  alcoholLevel: AlcoholLevel;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ length: '128', nullable: true })
  photoUrl?: string;

  @Column({ type: 'text', nullable: true })
  variation?: string;

  @ManyToOne(() => SubCategory)
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: SubCategory;

  @OneToMany(() => Step, (step) => step.cocktail)
  steps: Step[];
}
