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
import { CocktailsService } from './cocktails.service';
import { CocktailInputDto } from './dto/CocktailInput.dto';
import { CreateCocktail, DeleteCocktail, UpdateCocktail } from './use-cases';

@Controller('cocktails')
export class CocktailsController {
  constructor(
    private service: CocktailsService,
    private createCocktail: CreateCocktail,
    private deleteCocktail: DeleteCocktail,
    private updateCocktail: UpdateCocktail,
  ) {}

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
  async create(@Body() body: CocktailInputDto) {
    return this.createCocktail.call(body);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() body: CocktailInputDto) {
    return this.updateCocktail.call(id, body);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.deleteCocktail.call(id);
  }
}
