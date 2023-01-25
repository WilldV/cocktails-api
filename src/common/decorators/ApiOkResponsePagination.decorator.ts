import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'Total records number', example: 100 })
  total: number;

  @ApiProperty({ description: 'Number of records skipped', example: 0 })
  offset: number;

  @ApiProperty({ description: 'Number of records taken', example: 20 })
  limit: number;

  @ApiProperty({ description: 'Records', type: 'object', isArray: true })
  data: T[];
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
  description?: string,
) =>
  applyDecorators(
    ApiExtraModels(PaginatedResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
      description,
    }),
  );
