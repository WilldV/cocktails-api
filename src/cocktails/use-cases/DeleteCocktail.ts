import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { IngredientsStepsService } from '../../ingredients-steps';
import { StepsService } from '../../steps';
import { CocktailsService } from '../cocktails.service';

@Injectable()
export class DeleteCocktail {
  constructor(
    private cocktailService: CocktailsService,
    private stepsService: StepsService,
    private ingredientsStepService: IngredientsStepsService,
  ) {}

  async call(cocktailId: number) {
    const [deletedCocktail, steps] = await Promise.all([
      this.cocktailService.deleteById(cocktailId),
      this.stepsService.findAll({
        where: {
          cocktailId,
        },
      }),
    ]);

    if (!deletedCocktail) return;

    const stepIDs = steps.map((step) => step.id);

    await Promise.all([
      this.stepsService.delete({
        cocktailId,
      }),
      this.ingredientsStepService.delete({
        stepId: In(stepIDs),
      }),
    ]);

    return deletedCocktail;
  }
}
