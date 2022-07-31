import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common';
import { Ingredient } from '../../ingredients';
import { Step } from '../../steps';

@Entity('ingredientStep')
export class IngredientStep extends BaseEntity {
  @Column({ length: 32, nullable: true })
  quantity?: string;

  @Column()
  ingredientId: number;

  @Column()
  stepId: number;

  @ManyToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Ingredient;

  @ManyToOne(() => Step)
  @JoinColumn({ name: 'stepId' })
  step: Step;
}
