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
import { ParamsDto, ParamsPipe } from '../common';
import { SubcategoryInputDto } from './dto';
import { SubcategoriesService } from './subcategories.service';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private service: SubcategoriesService) {}

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
  async create(@Body() body: SubcategoryInputDto) {
    return this.service.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: SubcategoryInputDto) {
    return this.service.updateById(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
