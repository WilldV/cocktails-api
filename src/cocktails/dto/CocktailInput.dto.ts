import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AlcoholLevel, PreparationType } from '../../common';

//TODO: Handle images
export class CocktailInputDto {
  @ApiProperty({ description: 'Name for cocktail' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Id of cocktail's subcategory" })
  @Type(() => Number)
  @IsNumber()
  subCategoryId: number;

  @ApiProperty({
    description: 'Alcohol level of  cocktail',
    enum: AlcoholLevel,
  })
  @IsEnum(AlcoholLevel)
  alcoholLevel: AlcoholLevel;

  @ApiProperty({
    description: 'Description of cocktail',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'Possible variation of main preparation for the cocktail',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  variation?: string;

  @ApiProperty({
    description: 'Steps for cocktail preparation',
    isArray: true,
    type: () => CreateCocktailStepDto,
  })
  @Type(() => CreateCocktailStepDto)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  steps: CreateCocktailStepDto[];
}

class CreateCocktailStepDto {
  @ApiProperty({
    description: 'Order of step',
  })
  @Type(() => Number)
  @IsNumber()
  order: number;

  @ApiProperty({
    description: 'Preparation type of the step',
    enum: PreparationType,
    required: false,
  })
  @IsEnum(PreparationType)
  @IsOptional()
  preparationType?: PreparationType;

  @ApiProperty({
    description: 'Last instruction to complete the step',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  finalStep?: string;

  @ApiProperty({
    description: 'Description of step',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    description: 'Ingredients to use on step',
    isArray: true,
    type: () => CreateCocktailIngredientDto,
  })
  @Type(() => CreateCocktailIngredientDto)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  ingredients: CreateCocktailIngredientDto[];
}

class CreateCocktailIngredientDto {
  @ApiProperty({
    description: 'Quantity of ingredient',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  quantity?: string;

  @ApiProperty({
    description: 'ID of ingredient',
  })
  @Type(() => Number)
  @IsNumber()
  ingredientId: number;
}
