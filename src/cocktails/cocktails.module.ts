import { Module } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktail } from './entities/cocktail.entity';
import { StepsModule } from '../steps';
import { IngredientsStepsModule } from '../ingredients-steps';
import { CreateCocktail, DeleteCocktail, UpdateCocktail } from './use-cases';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cocktail]),
    StepsModule,
    IngredientsStepsModule,
  ],
  providers: [CocktailsService, CreateCocktail, DeleteCocktail, UpdateCocktail],
  controllers: [CocktailsController],
})
export class CocktailsModule {}
