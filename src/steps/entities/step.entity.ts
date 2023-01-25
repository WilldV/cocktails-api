import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cocktail } from '../../cocktails/entities/cocktail.entity';
import { BaseEntity, PreparationType } from '../../common';
import { IngredientStep } from '../../ingredients-steps/entities/ingredientsSteps.entity';

@Entity('step')
export class Step extends BaseEntity {
  @ApiProperty({ description: 'Order of Step' })
  @Column()
  order: number;

  @ApiProperty({ description: 'Cocktail ID that step belongs to' })
  @Column()
  cocktailId: number;

  @ApiProperty({
    description: 'Step preparation type',
    nullable: true,
    required: false,
    enum: PreparationType,
  })
  @Column({ type: 'enum', enum: PreparationType, nullable: true })
  preparationType?: PreparationType;

  @ApiProperty({
    description: 'Final instruction to complete step',
    nullable: true,
    required: false,
  })
  @Column({ length: '256', nullable: true })
  finalStep?: string;

  @ApiProperty({
    description: 'Description of step',
    nullable: true,
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiHideProperty()
  @ManyToOne(() => Cocktail, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cocktailId' })
  cocktail?: Cocktail;

  @ApiProperty({
    description: 'Ingredients required for step',
    nullable: true,
    required: false,
    type: () => [IngredientStep],
  })
  @OneToMany(() => IngredientStep, (is) => is.step)
  ingredientSteps?: IngredientStep[];
}
