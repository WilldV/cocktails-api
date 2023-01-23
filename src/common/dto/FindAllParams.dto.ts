import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { DEFAULT_LIMIT } from '../const';
import { FindOneParamsDto } from './FindOneParams.dto';

export class FindAllParamsDto extends FindOneParamsDto {
  @ApiProperty({
    required: false,
    type: [() => String, () => [String]],
    description: 'Field for processing sort',
    example:
      'For name field: name for sorting ascending, -name for sorting descending',
  })
  @IsOptional()
  @IsNotEmpty()
  order?: string | string[];

  @ApiProperty({
    description: 'Number of records to take',
    default: DEFAULT_LIMIT,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  limit?: number;

  @ApiProperty({
    description: 'Number of records to skip',
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  offset?: number;

  formattedOrder: Record<string, 'DESC' | 'ASC'>;
}
