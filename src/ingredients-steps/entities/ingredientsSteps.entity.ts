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

  @ManyToOne(() => Ingredient, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Ingredient;

  @ManyToOne(() => Step, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'stepId' })
  step: Step;
}
