import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Cocktail } from '../../cocktails';
import { BaseEntity } from '../../common';
import { IngredientStep } from '../../ingredients-steps';

export enum PreparationType {
  DIRECT = 'DIRECT',
  SHAKER = 'SHAKER',
  MIXER_GLASS = 'MIXER_GLASS',
  ADD = 'ADD',
}

@Entity('step')
export class Step extends BaseEntity {
  @Column()
  order: number;

  @Column()
  cocktailId: number;

  @Column({ type: 'enum', enum: PreparationType, nullable: true })
  preparationType?: PreparationType;

  @Column({ length: '256', nullable: true })
  finalStep?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Cocktail)
  @JoinColumn({ name: 'cocktailId' })
  cocktail: Cocktail;

  @OneToMany(() => IngredientStep, (is) => is.step)
  ingredientSteps: IngredientStep[];
}
