import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryInputDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
