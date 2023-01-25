import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../../ingredients/entities/ingredient.entity';
import { Step } from '../../steps/entities/step.entity';

@Entity('ingredientStep')
export class IngredientStep extends BaseEntity {
  @ApiProperty({
    example: '1.5 to 3 oz',
    description: 'Quantity of ingredient',
    nullable: true,
  })
  @Column({ length: 32, nullable: true })
  quantity?: string;

  @ApiProperty({ description: 'Ingredient ID' })
  @Column()
  ingredientId: number;

  @ApiHideProperty()
  @Column()
  stepId: number;

  @ApiProperty({
    description: 'Ingredient',
    nullable: true,
    required: false,
    type: () => Ingredient,
  })
  @ManyToOne(() => Ingredient, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'ingredientId' })
  ingredient?: Ingredient;

  @ApiHideProperty()
  @ManyToOne(() => Step, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'stepId' })
  step?: Step;
}
