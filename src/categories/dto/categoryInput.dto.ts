import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CategoryInputDto {
  @ApiProperty({ description: 'Name for category' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of category', required: false })
  @IsOptional()
  @IsNotEmpty()
  description?: string;
}
