import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class FindOneParamsDto {
  @ApiProperty({
    required: false,
    type: [() => String, () => [String]],
    description: 'Relations to load',
  })
  @IsOptional()
  @IsNotEmpty({ each: true })
  relations?: string | string[];

  formattedRelations: string[];
}
