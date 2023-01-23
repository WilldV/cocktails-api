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
import {
  ApiOkResponsePaginated,
  FindAllParamsDto,
  FindOneParamsDto,
  ParamsPipe,
} from '../common';
import { SubcategoryInputDto } from './dto';
import { SubCategory } from './entities/subcategory.entity';
import { SubcategoriesService } from './subcategories.service';

@ApiTags('subcategories')
@Controller('subcategories')
export class SubcategoriesController {
  constructor(private service: SubcategoriesService) {}

  @ApiOkResponsePaginated(
    SubCategory,
    'Returns all subcategories with requested relations loaded and sorted by order field if provided',
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
      'Returns a subcategory related to given ID with requested relations loaded',
    type: SubCategory,
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
    description: 'Returns a new subcategory created with the given data',
    type: SubCategory,
  })
  @Post()
  async create(@Body() body: SubcategoryInputDto) {
    return this.service.create(body);
  }

  @ApiOkResponse({
    description:
      'Returns an updated subcategory with the given data related to given ID',
    type: SubCategory,
  })
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: SubcategoryInputDto) {
    return this.service.updateById(id, body);
  }

  @ApiOkResponse({
    description: 'Returns a deleted subcategory related to given ID',
    type: SubCategory,
  })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
