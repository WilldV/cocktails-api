import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common';
import { IngredientStep } from '../../ingredients-steps';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('ingredient')
export class Ingredient extends BaseEntity {
  @ApiProperty({ example: 'Gin', description: 'Ingredient name' })
  @Column({ length: 256 })
  name: string;

  @ApiProperty({
    example:
      'Gin is a distilled alcoholic drink that derives its predominant flavour from juniper berries',
    description: 'Ingredient description',
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiHideProperty()
  @OneToMany(() => IngredientStep, (is) => is.ingredient)
  ingredientSteps: IngredientStep[];
}
