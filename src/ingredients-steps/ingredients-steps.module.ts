import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientStep } from './entities/ingredientsSteps.entity';
import { IngredientsStepsService } from './ingredients-steps.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientStep])],
  providers: [IngredientsStepsService],
  exports: [IngredientsStepsService],
})
export class IngredientsStepsModule {}
