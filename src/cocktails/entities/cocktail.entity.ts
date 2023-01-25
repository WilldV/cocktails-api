import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AlcoholLevel, BaseEntity } from '../../common';
import { Step } from '../../steps/entities/step.entity';
import { SubCategory } from '../../subcategories/entities/subcategory.entity';

@Entity('cocktail')
export class Cocktail extends BaseEntity {
  @ApiProperty({ example: 'Mojito', description: 'Name of cocktail' })
  @Column({ length: 256 })
  name: string;

  @ApiProperty({ example: 1, description: 'Id of subcategory' })
  @Column()
  subCategoryId: number;

  @ApiProperty({
    description: 'Alcohol level of cocktail',
    example: AlcoholLevel.LOW,
    enum: AlcoholLevel,
  })
  @Column({ type: 'enum', enum: AlcoholLevel })
  alcoholLevel: AlcoholLevel;

  @ApiProperty({
    example:
      'Mojito is a traditional Cuban highball. The cocktail often consists of five ingredients: white rum, sugar (traditionally sugar cane juice), lime juice, soda water, and mint.',
    description: 'Description of cocktail',
    nullable: true,
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({
    description: 'Photo URL of cocktail',
    nullable: true,
    required: false,
  })
  @Column({ length: '128', nullable: true })
  photoUrl?: string;

  @ApiProperty({
    description: 'Variation of cocktail',
    example: 'Add strawberries',
    nullable: true,
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  variation?: string;

  @ApiProperty({
    description: 'Cocktail subcategory',
    nullable: true,
    required: false,
    type: () => SubCategory,
  })
  @ManyToOne(() => SubCategory, {
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'subCategoryId' })
  subCategory?: SubCategory;

  @ApiProperty({
    description: "Cocktail's steps",
    isArray: true,
    type: () => [Step],
  })
  @OneToMany(() => Step, (step) => step.cocktail)
  steps: Step[];
}
