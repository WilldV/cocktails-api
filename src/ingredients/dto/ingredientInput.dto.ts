import { IsNotEmpty, IsOptional } from 'class-validator';

export class IngredientInputDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
