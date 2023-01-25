import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IngredientStep } from './entities/ingredientsSteps.entity';
import { IngredientsStepsService } from './ingredients-steps.service';

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
      ],
    }).compile();

    service = module.get<IngredientsStepsService>(IngredientsStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
