import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Step } from '../steps';
import { IngredientStep } from './entities/ingredientsSteps.entity';
import { IngredientsStepsService } from './ingredients-steps.service';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

describe('IngredientsStepsService', () => {
  let service: IngredientsStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientsStepsService,
        {
          provide: getRepositoryToken(IngredientStep),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Step),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Ingredient),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<IngredientsStepsService>(IngredientsStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
