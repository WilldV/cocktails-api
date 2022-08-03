import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ParamsDto {
  @IsOptional()
  @IsNotEmpty({ each: true })
  relations?: string | string[];

  @IsOptional()
  @IsNotEmpty()
  order?: string | string[];

  formattedRelations: string[];

  formattedOrder: Record<string, 'DESC' | 'ASC'>;
}
