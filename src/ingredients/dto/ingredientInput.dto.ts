import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class IngredientInputDto {
  @ApiProperty({ description: 'Name for ingredient' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of ingredient', required: false })
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
