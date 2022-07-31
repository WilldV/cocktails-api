import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryInputDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.categoriesService.findById(id);
  }

  @Post()
  async create(@Body() body: CategoryInputDto) {
    return this.categoriesService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CategoryInputDto) {
    return this.categoriesService.updateById(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.categoriesService.deleteById(id);
  }
}
