import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsStepsService } from '../../ingredients-steps/ingredients-steps.service';
import { CocktailsService } from '../cocktails.service';
import { StepsService } from '../../steps/steps.service';
import { AlcoholLevel } from '../../common';
import { UpdateCocktail } from './UpdateCocktail';
import { CocktailInputDto } from '../dto/CocktailInput.dto';

describe('UpdateCocktail', () => {
  let service: UpdateCocktail;
  let cocktailsService: CocktailsService;
  let stepsService: StepsService;
  let ingredientsStepsService: IngredientsStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCocktail,
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

    service = module.get<UpdateCocktail>(UpdateCocktail);
    cocktailsService = module.get<CocktailsService>(CocktailsService);
    stepsService = module.get<StepsService>(StepsService);
    ingredientsStepsService = module.get<IngredientsStepsService>(
      IngredientsStepsService,
    );
  });

  describe('call', () => {
    it('should return an updated cocktail calling createMany steps, ingredientSteps and delete steps, ingredientSteps once', async () => {
      const cocktailId = 4;
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
      const updatedtCocktail = { id: 1, name: 'Test cocktail' };
      cocktailsService.updateById = jest
        .fn()
        .mockResolvedValueOnce(updatedtCocktail);
      stepsService.findAll = jest.fn().mockResolvedValueOnce([{ id: 1 }]);
      stepsService.createMany = jest.fn().mockResolvedValueOnce([]);
      stepsService.delete = jest.fn();
      ingredientsStepsService.delete = jest.fn();
      ingredientsStepsService.createMany = jest
        .fn()
        .mockResolvedValueOnce([{ id: 4 }]);

      const result = await service.call(cocktailId, cocktailInputDto);
      expect(result).toEqual(updatedtCocktail);
      expect(stepsService.createMany).toBeCalledTimes(1);
      expect(ingredientsStepsService.createMany).toBeCalledTimes(1);
      expect(stepsService.delete).toBeCalledTimes(1);
      expect(ingredientsStepsService.delete).toBeCalledTimes(1);
    });

    it('should return undefined and dont call delete steps if cocktail does not exist', async () => {
      const cocktailId = 3;

      const updatedCocktail = undefined;

      cocktailsService.updateById = jest
        .fn()
        .mockResolvedValueOnce(updatedCocktail);
      stepsService.findAll = jest.fn();
      stepsService.delete = jest.fn();

      const result = await service.call(cocktailId, {} as CocktailInputDto);
      expect(stepsService.delete).toHaveBeenCalledTimes(0);
      expect(result).toEqual(updatedCocktail);
    });
  });
});
