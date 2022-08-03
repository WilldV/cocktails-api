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
import { ParamsPipe, ParamsDto } from '../common';
import { IngredientInputDto } from './dto';
import { IngredientsService } from './ingredients.service';

@Controller('ingredients')
export class IngredientsController {
  constructor(private service: IngredientsService) {}

  @Get()
  async findAll(
    @Query(ParamsPipe)
    { formattedOrder: order, formattedRelations: relations }: ParamsDto,
  ) {
    return this.service.findAll({
      relations,
      order,
    });
  }

  @Get(':id')
  async findById(
    @Param('id') id: number,
    @Query(ParamsPipe)
    { formattedRelations: relations }: ParamsDto,
  ) {
    return this.service.findById(id, { relations });
  }

  @Post()
  async create(@Body() body: IngredientInputDto) {
    return this.service.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: IngredientInputDto) {
    return this.service.updateById(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
