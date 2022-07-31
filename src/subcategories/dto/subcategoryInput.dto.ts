import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SubcategoryInputDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
