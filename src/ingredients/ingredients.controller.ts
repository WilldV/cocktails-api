import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import {
  ApiOkResponsePaginated,
  API_KEY_HEADER,
  AuthGuard,
  FindAllParamsDto,
  FindOneParamsDto,
  ParamsPipe,
} from '../common';
import { IngredientInputDto } from './dto';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private service: IngredientsService) {}

  @ApiOkResponsePaginated(
    Ingredient,
    'Returns all ingredients with requested relations loaded and sorted by order field if provided',
  )
  @Get()
  async findAll(
    @Query(ParamsPipe)
    {
      formattedOrder: order,
      formattedRelations: relations,
      limit,
      offset,
    }: FindAllParamsDto,
  ) {
    return this.service.findAndCount({
      relations,
      order,
      take: limit,
      skip: offset,
    });
  }

  @ApiOkResponse({
    description:
      'Returns a ingredient related to given ID with requested relations loaded',
    type: Ingredient,
  })
  @Get(':id')
  async findById(
    @Param('id') id: number,
    @Query(ParamsPipe)
    { formattedRelations: relations }: FindOneParamsDto,
  ) {
    return this.service.findById(id, { relations });
  }

  @ApiOkResponse({
    description: 'Returns a new ingredient created with the given data',
    type: Ingredient,
  })
  @ApiSecurity(API_KEY_HEADER)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: IngredientInputDto) {
    return this.service.create(body);
  }

  @ApiOkResponse({
    description:
      'Returns an updated ingredient with the given data related to given ID',
    type: Ingredient,
  })
  @ApiSecurity(API_KEY_HEADER)
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: IngredientInputDto) {
    return this.service.updateById(id, body);
  }

  @ApiOkResponse({
    description: 'Returns a deleted ingredient related to given ID',
    type: Ingredient,
  })
  @ApiSecurity(API_KEY_HEADER)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
