import { Injectable } from '@nestjs/common';
import { IngredientsStepsService } from '../../ingredients-steps';
import { StepsService } from '../../steps';
import { CocktailsService } from '../cocktails.service';
import { CocktailInputDto } from '../dto/CocktailInput.dto';

@Injectable()
export class CreateCocktail {
  constructor(
    private cocktailService: CocktailsService,
    private stepsService: StepsService,
    private ingredientsStepService: IngredientsStepsService,
  ) {}

  async call(body: CocktailInputDto) {
    const { name, subCategoryId, alcoholLevel, description, variation, steps } =
      body;

    const newCocktail = await this.cocktailService.create({
      name,
      subCategoryId,
      alcoholLevel,
      description,
      variation,
    });

    const newSteps = await this.stepsService.createMany(
      steps.map(({ order, preparationType, description, finalStep }) => {
        return {
          order,
          preparationType,
          description,
          finalStep,
          cocktailId: newCocktail.id,
        };
      }),
    );

    const newIngredientSteps = [];

    newSteps.forEach(({ id, order }) => {
      const matchStep = steps.find((step) => step.order == order);

      matchStep.ingredients.forEach(({ quantity, ingredientId }) => {
        newIngredientSteps.push({
          stepId: id,
          ingredientId,
          quantity,
        });
      });
    });

    await this.ingredientsStepService.createMany(newIngredientSteps);

    return newCocktail;
  }
}
