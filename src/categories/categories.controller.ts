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
import { Category } from '.';
import {
  ApiOkResponsePaginated,
  API_KEY_HEADER,
  AuthGuard,
  FindAllParamsDto,
  FindOneParamsDto,
  ParamsPipe,
} from '../common';
import { CategoriesService } from './categories.service';
import { CategoryInputDto } from './dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @ApiOkResponsePaginated(
    Category,
    'Returns all categories with requested relations loaded and sorted by order field if provided',
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
  @ApiSecurity(API_KEY_HEADER)
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() body: CategoryInputDto) {
    return this.service.create(body);
  }

  @ApiOkResponse({
    description:
      'Returns an updated category with the given data related to given ID',
    type: Category,
  })
  @ApiSecurity(API_KEY_HEADER)
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CategoryInputDto) {
    return this.service.updateById(id, body);
  }

  @ApiOkResponse({
    description: 'Returns a deleted category related to given ID',
    type: Category,
  })
  @ApiSecurity(API_KEY_HEADER)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.deleteById(id);
  }
}
