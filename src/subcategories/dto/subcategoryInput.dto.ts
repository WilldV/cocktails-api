import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SubcategoryInputDto {
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
