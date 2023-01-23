import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllParamsDto, FindOneParamsDto, ParamsPipe } from '../common';
import { IngredientInputDto } from './dto';
import { Ingredient } from './entities/ingredient.entity';
import { IngredientsService } from './ingredients.service';

@ApiTags('ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private service: IngredientsService) {}

  @ApiOkResponse({
    description:
      'Returns all ingredients with requested relations loaded and sorted by order field if provided',
    type: [Ingredient],
  })
  @Get()
  async findAll(
    @Query(ParamsPipe)
    { formattedOrder: order, formattedRelations: relations }: FindAllParamsDto,
  ) {
    return this.service.findAll({
      relations,
      order,
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
  @Post()
  async create(@Body() body: IngredientInputDto) {
    return this.service.create(body);
  }

  @ApiOkResponse({
    description:
      'Returns an updated ingredient with the given data related to given ID',
    type: Ingredient,
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: IngredientInputDto) {
    return this.service.updateById(id, body);
  }

  @ApiOkResponse({
    description: 'Returns a deleted ingredient related to given ID',
    type: Ingredient,
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
