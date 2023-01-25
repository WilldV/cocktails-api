import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsStepsService } from '../../ingredients-steps/ingredients-steps.service';
import { CreateCocktail } from './CreateCocktail';
import { CocktailsService } from '../cocktails.service';
import { StepsService } from '../../steps/steps.service';
import { AlcoholLevel } from '../../common';

describe('CreateCocktail', () => {
  let service: CreateCocktail;
  let cocktailsService: CocktailsService;
  let stepsService: StepsService;
  let ingredientsStepsService: IngredientsStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCocktail,
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

    service = module.get<CreateCocktail>(CreateCocktail);
    cocktailsService = module.get<CocktailsService>(CocktailsService);
    stepsService = module.get<StepsService>(StepsService);
    ingredientsStepsService = module.get<IngredientsStepsService>(
      IngredientsStepsService,
    );
  });

  describe('call', () => {
    it('should return a new created cocktail calling createMany steps and ingredientSteps once', async () => {
      const cocktailInputDto = {
        name: 'Test cocktail',
        subCategoryId: 1,
        alcoholLevel: AlcoholLevel.HIGH,
        steps: [
          {
            order: 1,
            ingredients: [
              { quantity: '1oz', ingredientId: 1 },
              { quantity: '1oz', ingredientId: 1 },
            ],
          },
        ],
      };
      const newCocktail = { id: 1, name: 'Test cocktail' };
      cocktailsService.create = jest.fn().mockResolvedValueOnce(newCocktail);
      stepsService.createMany = jest.fn().mockResolvedValueOnce([]);
      ingredientsStepsService.createMany = jest
        .fn()
        .mockResolvedValueOnce([{}]);

      const result = await service.call(cocktailInputDto);
      expect(result).toEqual(newCocktail);
      expect(stepsService.createMany).toBeCalledTimes(1);
      expect(ingredientsStepsService.createMany).toBeCalledTimes(1);
    });
  });
});
