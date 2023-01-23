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
import { ParamsPipe, FindAllParamsDto, FindOneParamsDto } from '../common';
import { CocktailsService } from './cocktails.service';
import { CocktailInputDto } from './dto/CocktailInput.dto';
import { Cocktail } from './entities/cocktail.entity';
import { CreateCocktail, DeleteCocktail, UpdateCocktail } from './use-cases';

@ApiTags('cocktails')
@Controller('cocktails')
export class CocktailsController {
  constructor(
    private service: CocktailsService,
    private createCocktail: CreateCocktail,
    private deleteCocktail: DeleteCocktail,
    private updateCocktail: UpdateCocktail,
  ) {}

  @ApiOkResponse({
    description:
      'Returns all cocktails with requested relations loaded and sorted by order field if provided',
    type: [Cocktail],
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
      'Returns a cocktail related to given ID with requested relations loaded',
    type: Cocktail,
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
    description: 'Returns a new cocktail created with the given data',
    type: Cocktail,
  })
  @Post()
  async create(@Body() body: CocktailInputDto) {
    return this.createCocktail.call(body);
  }

  @ApiOkResponse({
    description:
      'Returns an updated cocktails with the given data related to given ID',
    type: Cocktail,
  })
  @Put(':id')
  async updateById(@Param('id') id: number, @Body() body: CocktailInputDto) {
    return this.updateCocktail.call(id, body);
  }

  @ApiOkResponse({
    description: 'Returns a deleted cocktail related to given ID',
    type: Cocktail,
  })
  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return this.deleteCocktail.call(id);
  }
}
