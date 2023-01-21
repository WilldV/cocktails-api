import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common';
import { IngredientStep } from '../../ingredients-steps';

@Entity('ingredient')
export class Ingredient extends BaseEntity {
  @Column({ length: 256 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => IngredientStep, (is) => is.ingredient, {
    cascade: ['soft-remove'],
  })
  ingredientSteps: IngredientStep[];
}
