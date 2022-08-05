import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { PreparationType } from '../../steps';
import { AlcoholLevel } from '../entities/cocktail.entity';

//TODO: Handle images
export class CocktailInputDto {
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  subCategoryId: number;

  @IsEnum(AlcoholLevel)
  alcoholLevel: AlcoholLevel;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  variation?: string;

  @Type(() => CreateCocktailStepDto)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  steps: CreateCocktailStepDto[];
}

export class CreateCocktailStepDto {
  @Type(() => Number)
  @IsNumber()
  order: number;

  @IsOptional()
  @IsEnum(PreparationType)
  preparationType?: PreparationType;

  @IsOptional()
  @IsNotEmpty()
  finalStep?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @Type(() => CreateCocktailIngredientDto)
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  ingredients: CreateCocktailIngredientDto[];
}

export class CreateCocktailIngredientDto {
  @IsOptional()
  @IsNotEmpty()
  quantity?: string;

  @Type(() => Number)
  @IsNumber()
  ingredientId: number;
}
