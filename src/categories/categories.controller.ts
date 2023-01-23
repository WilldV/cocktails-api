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
import { Category } from '.';
import { FindAllParamsDto, FindOneParamsDto, ParamsPipe } from '../common';
import { CategoriesService } from './categories.service';
import { CategoryInputDto } from './dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @ApiOkResponse({
    description:
      'Returns all categories with requested relations loaded and sorted by order field if provided',
    type: [Category],
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
      'Returns a category related to given ID with requested relations loaded',
    type: Category,
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
    description: 'Returns a new category created with the given data',
    type: Category,
  })
  @Post()
  async create(@Body() body: CategoryInputDto) {
    return this.service.create(body);
  }

  @ApiOkResponse({
    description:
      'Returns an updated category with the given data related to given ID',
    type: Category,
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CategoryInputDto) {
    return this.service.updateById(id, body);
  }

  @ApiOkResponse({
    description: 'Returns a deleted category related to given ID',
    type: Category,
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
