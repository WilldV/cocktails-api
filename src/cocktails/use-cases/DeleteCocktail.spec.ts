import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsStepsService } from '../../ingredients-steps/ingredients-steps.service';
import { CocktailsService } from '../cocktails.service';
import { StepsService } from '../../steps/steps.service';
import { DeleteCocktail } from './DeleteCocktail';

describe('DeleteCocktail', () => {
  let service: DeleteCocktail;
  let cocktailsService: CocktailsService;
  let stepsService: StepsService;
  let ingredientsStepsService: IngredientsStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCocktail,
        {
          provide: CocktailsService,
          useValue: {},
        },
        {
          provide: StepsService,
          useValue: {},
        },
        {
          provide: IngredientsStepsService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<DeleteCocktail>(DeleteCocktail);
    cocktailsService = module.get<CocktailsService>(CocktailsService);
    stepsService = module.get<StepsService>(StepsService);
    ingredientsStepsService = module.get<IngredientsStepsService>(
      IngredientsStepsService,
    );
  });

  describe('call', () => {
    it('should return a new deleted cocktail calling delete steps and ingredientSteps once if cocktail exists', async () => {
      const cocktailId = 2;

      const deletedCocktail = { id: 1, name: 'Test cocktail' };

      cocktailsService.deleteById = jest
        .fn()
        .mockResolvedValueOnce(deletedCocktail);
      stepsService.findAll = jest.fn().mockReturnValueOnce([{ id: 1 }]);
      stepsService.delete = jest.fn();
      ingredientsStepsService.delete = jest.fn();

      const result = await service.call(cocktailId);
      expect(stepsService.delete).toBeCalledTimes(1);
      expect(ingredientsStepsService.delete).toBeCalledTimes(1);
      expect(result).toEqual(deletedCocktail);
    });

    it('should return undefined and dont call delete steps if cocktail does not exist', async () => {
      const cocktailId = 3;

      const deletedCocktail = undefined;

      cocktailsService.deleteById = jest
        .fn()
        .mockResolvedValueOnce(deletedCocktail);
      stepsService.findAll = jest.fn();
      stepsService.delete = jest.fn();

      const result = await service.call(cocktailId);
      expect(stepsService.delete).toHaveBeenCalledTimes(0);
      expect(result).toEqual(deletedCocktail);
    });
  });
});
