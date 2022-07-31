import { Module } from '@nestjs/common';
import { CocktailsService } from './cocktails.service';
import { CocktailsController } from './cocktails.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cocktail } from './entities/cocktail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cocktail])],
  providers: [CocktailsService],
  controllers: [CocktailsController],
})
export class CocktailsModule {}
