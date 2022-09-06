import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { IngredientsStepsService } from '../../ingredients-steps';
import { StepsService } from '../../steps';
import { CocktailsService } from '../cocktails.service';
import { CocktailInputDto } from '../dto/CocktailInput.dto';

@Injectable()
export class UpdateCocktail {
  constructor(
    private cocktailService: CocktailsService,
    private stepsService: StepsService,
    private ingredientsStepService: IngredientsStepsService,
  ) {}

  //TODO: Improve this logic to avoid re create new information each time
  async call(cocktailId: number, body: CocktailInputDto) {
    const [updatedtCocktail, existingSteps] = await Promise.all([
      this.cocktailService.updateById(cocktailId, {
        name: body.name,
        subCategoryId: body.subCategoryId,
        alcoholLevel: body.alcoholLevel,
        description: body.description,
        variation: body.variation,
      }),
      this.stepsService.findAll({
        where: {
          cocktailId,
        },
      }),
    ]);

    if (!updatedtCocktail) return;

    const stepIDs = existingSteps.map((step) => step.id);

    const [] = await Promise.all([
      this.stepsService.delete({
        cocktailId,
      }),
      this.ingredientsStepService.delete({
        stepId: In(stepIDs),
      }),
    ]);

    const newSteps = await this.stepsService.createMany(
      body.steps.map(({ order, preparationType, description, finalStep }) => {
        return {
          order,
          preparationType,
          description,
          finalStep,
          cocktailId: updatedtCocktail.id,
        };
      }),
    );

    const newIngredientSteps = [];

    newSteps.forEach(({ id, order }) => {
      const matchStep = body.steps.find((step) => step.order == order);

      matchStep.ingredientSteps.forEach(({ quantity, ingredientId }) => {
        newIngredientSteps.push({
          stepId: id,
          ingredientId,
          quantity,
        });
      });
    });

    await this.ingredientsStepService.createMany(newIngredientSteps);

    return updatedtCocktail;
  }
}
