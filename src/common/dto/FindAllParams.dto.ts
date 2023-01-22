import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { FindOneParamsDto } from './FindOneParams.dto';

export class FindAllParamsDto extends FindOneParamsDto {
  @ApiProperty({
    required: false,
    type: [() => String, () => [String]],
    description: 'Field for processing sort',
  })
  @IsOptional()
  @IsNotEmpty()
  order?: string | string[];

  formattedOrder: Record<string, 'DESC' | 'ASC'>;
}
