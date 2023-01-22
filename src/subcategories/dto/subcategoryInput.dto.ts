import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SubcategoryInputDto {
  @ApiProperty({ description: 'Name for subcategory' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "ID of subcategory's category" })
  @Type(() => Number)
  @IsNumber()
  categoryId: number;

  @ApiProperty({ description: 'Description of ingredient', required: false })
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
